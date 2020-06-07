const cartItems = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(cartItem => cartItem.id !== action.payload.id);
    case 'INCRE_QUANTITY':
      state[action.payload].quantity += 1;
      return [...state];
    case 'DE_QUANTITY':
      const id = action.payload;
      if (state[id].quantity === 1) {
        state.splice(id, 1);
      } else {
        state[id].quantity -= 1;
      }
      return [...state];
    default:
      return state;
  }
};
export default cartItems;
