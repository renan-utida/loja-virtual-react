import { createContext, useContext, useReducer } from 'react';
import { cartReducer } from './CartReducer';

const CartContext = createContext();

const initialState = {
  items: [],
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItem(product, quantity = 1) {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }

  function updateQuantity(id, quantity) {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }

  function clearCart() {
    dispatch({ type: 'CLEAR_CART' });
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart precisa ser usado dentro de um CartProvider');
  }

  return context;
}