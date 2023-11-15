import React, { createContext, useState, useContext } from "react";

export const CartContext = createContext(null);

export const ShoppingCartContext = ({ children }) => {
  const [needToUpdateCart, setNeedToUpdateCart] = useState(false);

  const updateCart = (value) => {
    setNeedToUpdateCart(prevValue => value);
  };

  return (
    <CartContext.Provider value={{ needToUpdateCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(CartContext);
};
