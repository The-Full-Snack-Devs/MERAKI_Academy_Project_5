import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: localStorage.getItem("token") || null,
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("token", action.payload)
    },
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;