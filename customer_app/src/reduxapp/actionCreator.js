export function toggleIsAdding() {
  return {
    type: 'TOGGLE_ISADDING',
  };
}

export function toggleAddWord(en, vn) {
  return {
    type: 'ADD_WORD',
    en,
    vn,
  };
}

export function addingToCart(product) {
  return {
    type: 'ADD_TO_CART',
    payload: product,
  };
}

export function increQuanity(id) {
  return {
    type: 'INCRE_QUANTITY',
    payload: id,
  };
}

export function deQuantity(id) {
  return {
    type: 'DE_QUANTITY',
    payload: id,
  };
}
