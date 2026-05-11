import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  const raw = sessionStorage.getItem("dm_cart");
  return raw ? JSON.parse(raw) : null;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    item: loadCart(),
  },
  reducers: {
    setCart(state, action) {
      state.item = action.payload;
    },
    clearCart(state) {
      state.item = null;
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
