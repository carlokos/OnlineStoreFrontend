import UserService from "../../services/userService";
import CartService from "../../services/cartService";
import ProductService from "../../services/productService";
import Cookies from 'js-cookie';
import { publish } from "./cartListener";
import { OutOfStockError } from "../../exceptions/outOfStockException";

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
export const addToCart = async (product, quantity) => {
  try {
    const userId = await getUserId();
    let cart = Cookies.getJSON('cart') || [];
    const existingItem = cart.find((item) => item.productId === product.id);
    const productInStock = await checkProductQuantity(product.id);

    if (productInStock) {
      throw new OutOfStockError("Product out of stock");
    }

    if (quantity === undefined) {
      quantity = 1;
    }

    if (existingItem) {
      existingItem.quantity += parseInt(quantity, 10);
      if (userId !== 0) {
        await CartService.addQuantityToCart(userId, product.id, quantity);
      }
    } else {
      const newItem = { productId: product.id, quantity: quantity, userId: userId };
      cart.push(newItem);
      if (userId !== 0) {
        await CartService.addCart(newItem);
      }
    }
    updateProductQuantity(product.id, quantity, false);
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    publish('CART_UPDATED', getTotalQuantity());
  } catch(error){
    throw error;
  }
};

export const asignCartToCurrentUser = async () => {
  const userId = await getUserId();
  let cart = Cookies.getJSON('cart') || [];
  let newCart = [];

  const productsWithUserIdZero = cart.filter(item => item.userId === 0);
  for (const item of productsWithUserIdZero) {
    const updatedItem = { ...item, userId: userId };
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
  const removedItem = cart.find((item) => item.productId === productId);
  const updatedCart = cart.filter((item) => item.productId !== productId);
  const userId = await getUserId();

  if (userId !== 0) {
    await CartService.deleteCart(id);
  }

  updateProductQuantity(productId, removedItem.quantity, true);
  Cookies.remove('cart');
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  publish('CART_UPDATED', getTotalQuantity());
  return updatedCart;
};

export const increaseQuantity = async (productId) => {
  const productInStock = await checkProductQuantity(productId);
  if (productInStock) {
    throw new OutOfStockError("Product out of stock");
  }

  let cart = Cookies.getJSON('cart') || [];
  const userId = await getUserId();
  const updatedCart = await Promise.all(cart.map(async (item) => {
    if (item.productId === productId) {
      const updatedItem = { ...item, quantity: item.quantity + 1 };
      if (userId !== 0) {
        await CartService.updateCart(updatedItem);
      }
      return updatedItem;
    }
    return item;
  }));

  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  updateProductQuantity(productId, 1, false);
  publish('CART_UPDATED', getTotalQuantity());
  return updatedCart;
};

export const decreaseQuantity = async (productId) => {
  let cart = Cookies.getJSON('cart') || [];
  const userId = await getUserId();
  const updatedCart = await Promise.all(cart.map(async (item) => {
    if (item.productId === productId) {
      const updatedItem = { ...item, quantity: Math.max(0, item.quantity - 1) };
      if (userId !== 0) {
        if (updatedItem.quantity === 0) {
          await CartService.deleteCart(item.id);
        } else {
          await CartService.updateCart(updatedItem);
        }
      }
      return updatedItem.quantity > 0 ? updatedItem : null;
    }
    return item;
  }));
  const filteredCart = updatedCart.filter((item) => item !== null);
  Cookies.set('cart', JSON.stringify(filteredCart), { expires: 7 });
  updateProductQuantity(productId, 1, true);
  publish('CART_UPDATED', getTotalQuantity());
  return filteredCart;
};

export const getCart = () => {
  return Cookies.getJSON('cart') || [];
};

export const getTotalQuantity = () => {
  const cart = Cookies.getJSON('cart') || [];
  const totalQuantity = cart.reduce((acc, curr) => acc + parseInt(curr.quantity), 0);
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
    const product = await ProductService.getProduct(item.productId);
    const productPrice = product.data.price;

    return productPrice * item.quantity;
  });

  const prices = await Promise.all(pricePromises);
  totalPrice = prices.reduce((acc, price) => acc + price, 0);

  return totalPrice;
};

export const updateProductQuantity = async (productId, quantity, isAdding) => {
  let product = await ProductService.getProduct(productId);

  if (isAdding) {
    product.data.stock += quantity;
  } else {
    product.data.stock -= quantity;
  }

  await ProductService.updateProduct(product.data);
}

export const checkProductQuantity = async (productId) => {
  const product = await ProductService.getProduct(productId);
  console.log(product.data.stock);
  return product.data.stock <= 0;
}
