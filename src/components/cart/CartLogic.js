import UserService from "../../services/userService";
import CartService from "../../services/cartService";
import Cookies from 'js-cookie';

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
  } else {
    const newItem = { product_id: product.id, quantity: 1, user_id: userId };
    cart.push(newItem);
    if (userId !== 0) {
      await CartService.addCart(newItem);
    }
  }
  Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
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
      console.log(newCart);
      await CartService.addCart(updatedItem);
    }
  }
}

export const removeFromCart = async (productId, id) => {
  let cart = Cookies.getJSON('cart') || [];
  const updatedCart = cart.filter((item) => item.product_id !== productId);

  await CartService.deleteCart(id);

  Cookies.remove('cart');
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
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
  return updatedCart;
};

export const decreaseQuantity = async (productId) => {
  let cart = Cookies.getJSON('cart') || [];
  const updatedCart = await Promise.all(cart.map(async (item) => {
    if (item.product_id === productId) {
      const updatedItem = { ...item, quantity: Math.max(0, item.quantity - 1) };
      await CartService.updateCart(updatedItem);
      return updatedItem;
    }
    return item;
  }));

  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  return updatedCart.filter((item) => item.quantity > 0);
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
