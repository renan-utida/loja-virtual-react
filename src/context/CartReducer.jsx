export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Produto já está no carrinho: soma a quantidade, sem passar do estoque
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                }
              : item
          ),
        };
      }

      // Produto novo: adiciona ao array
      return {
        ...state,
        items: [...state.items, { ...product, quantity }],
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        items: [],
      };
    }

    default:
      return state;
  }
};