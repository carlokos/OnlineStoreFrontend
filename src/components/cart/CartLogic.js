import UserService from "../../services/userService";
import CartService from "../../services/cartService";
import ProductService from "../../services/productService";
import Cookies from 'js-cookie';
import { publish } from "./cartListener";

//return 0 is user is not authenticated
const getUserId = async () => {
  try {
    const token = localStorage.getItem('token');
    const userData = await UserService.loadCurrentUser(token);
    const userId = userData.data ? userData.data.id : 0;
    return userId;
  } catch (error) {
    return 0;
  }
}
export const addToCart = async (product) => {
  const userId = await getUserId();
  let cart = Cookies.getJSON('cart') || [];
  const existingItem = cart.find((item) => item.product_id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
    if(userId !== 0){
      console.log("product ID: ", product.id);
      await CartService.addQuantityToCart(userId, product.id);
    }
  } else {
    const newItem = { product_id: product.id, quantity: 1, user_id: userId };
    cart.push(newItem);
    if (userId !== 0) {
      await CartService.addCart(newItem);
    }
  }
  Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
  publish('CART_UPDATED', getTotalQuantity());
};

export const asignCartToCurrentUser = async () => {
  const userId = await getUserId();
  let cart = Cookies.getJSON('cart') || [];
  let newCart = [];

  const productsWithUserIdZero = cart.filter(item => item.user_id === 0);
  for (const item of productsWithUserIdZero) {
    const updatedItem = { ...item, user_id: userId };
    if (userId !== 0) {
      newCart.push(updatedItem);
      await CartService.addCart(updatedItem);
    }
  }
  Cookies.remove('cart');
  const response = await CartService.getUserCart(userId);
  Cookies.set('cart', JSON.stringify(response.data), { expires: 7 });
}

export const removeFromCart = async (productId, id) => {
  let cart = Cookies.getJSON('cart') || [];
  const updatedCart = cart.filter((item) => item.product_id !== productId);

  await CartService.deleteCart(id);

  Cookies.remove('cart');
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  publish('CART_UPDATED', getTotalQuantity());
  return updatedCart;
};

export const increaseQuantity = async (productId) => {
  let cart = Cookies.getJSON('cart') || [];
  const updatedCart = await Promise.all(cart.map(async (item) => {
    if (item.product_id === productId) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      await CartService.updateCart(updatedItem);
      return updatedItem;
    }
    return item;
  }));

  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  publish('CART_UPDATED', getTotalQuantity());
  return updatedCart;
};

export const decreaseQuantity = async (productId) => {
  let cart = Cookies.getJSON('cart') || [];
  const updatedCart = await Promise.all(cart.map(async (item) => {
    if (item.product_id === productId) {
      const updatedItem = { ...item, quantity: Math.max(0, item.quantity - 1) };
      if (updatedItem.quantity === 0) {
        await CartService.deleteCart(item.id);
      } else {
        await CartService.updateCart(updatedItem);
      }
      return updatedItem.quantity > 0 ? updatedItem : null;
    }
    return item;
  }));
  const filteredCart = updatedCart.filter((item) => item !== null);
  Cookies.set('cart', JSON.stringify(filteredCart), { expires: 7 });
  publish('CART_UPDATED', getTotalQuantity());
  return filteredCart;
};

export const getCart = () => {
  return Cookies.getJSON('cart') || [];
};

export const getTotalQuantity = () => {
  const cart = Cookies.getJSON('cart') || [];
  const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
  return totalQuantity;
};

export const setUserCart = async () => {
  const token = localStorage.getItem('token');
  const userData = await getUserId();

  if (userData.data) {
    const userId = userData.data.id;
    const response = await CartService.getUserCart(userId);
    Cookies.remove('cart');
    return Cookies.set('cart', JSON.stringify(response.data), { expires: 7 });
  }
}

export const clearUserCart = async (userId) => {
  CartService.clearUserCart(userId);
  Cookies.remove('cart');
}

export const getTotalPrice = async () => {
  const cart = Cookies.getJSON('cart') || [];
  let totalPrice = 0;

  const pricePromises = cart.map(async (item) => {
    const product = await ProductService.getProduct(item.product_id);
    const productPrice = product.data.price;

    return productPrice * item.quantity;
  });

  const prices = await Promise.all(pricePromises);
  totalPrice = prices.reduce((acc, price) => acc + price, 0);

  return totalPrice;
};
