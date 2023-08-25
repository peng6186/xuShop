// convert the number to a 2 decimal points number
const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //   calculate the total price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  //    calculate the shipping price (free if the itemsPrice is over $100, $10 otherwise)
  state.shippingPricde = state.itemsPrice > 100 ? 0 : 10;
  //   calculate the tax price (assuming 15% sales tax)
  state.taxPrice = state.totalPrice * 0.15;
  //   calculate the total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPricde) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
