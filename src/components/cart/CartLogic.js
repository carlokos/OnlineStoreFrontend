import UserService from "../../services/userService";
import CartService from "../../services/cartService";

const getUserId = async () => {
  try {
    const token = localStorage.getItem('token');
    const userData = await UserService.loadCurrentUser(token);
    const userId = userData.data ? userData.data.id : 0;
    return userId;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
export const addToCart = async (product, setCart) => {
  const userId = await getUserId();
  let newItem;
  setCart((currItems) => {
    const isProductFound = currItems.find((item) => item.product_id === product.id);
    let updatedCart;
    console.log(product.id);
    if (isProductFound) {
      updatedCart = currItems.map((item) =>
        newItem = item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
      CartService.updateCart(newItem);
    } else {
      updatedCart = [...currItems, { product_id: product.id, quantity: 1, user_id: userId }];
      if (userId !== 0) {
        newItem = { product_id: product.id, quantity: 1, user_id: userId };
        CartService.addCart(newItem);
      }
    }

    saveCartToLocalStorage(updatedCart);
    return updatedCart;
  });
};

export const removeFromCart = (productId, id, setCart) => {
  setCart((currItems) => {
    const updatedCart = currItems.filter((item) => item.product_id !== productId);
    saveCartToLocalStorage(updatedCart);
    CartService.deleteCart(id);
    return updatedCart;
  });
};

export const increaseQuantity = (productId, id, setCart) => {
  setCart((currItems) => {
    const updatedCart = currItems.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: item.quantity + 1, id };
      }
      return item;
    });

    const newItem = updatedCart.find((item) => item.product_id === productId);

    CartService.updateCart(newItem);
    saveCartToLocalStorage(updatedCart);

    return updatedCart;
  });
};

export const decreaseQuantity = (productId, id, setCart) => {
  setCart((currItems) => {
    const updatedCart = currItems.map((item) => {
      if (item.product_id === productId) {
        return { ...item, quantity: Math.max(0, item.quantity - 1), id };
      }
      return item;
    });

    const newItem = updatedCart.find((item) => item.product_id === productId);

    CartService.updateCart(newItem);
    saveCartToLocalStorage(updatedCart);

    return updatedCart.filter((item) => item.quantity > 0);
  });
};

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

