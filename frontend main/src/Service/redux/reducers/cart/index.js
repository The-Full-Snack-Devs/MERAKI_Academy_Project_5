import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "catr",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      console.log(action.payload);
    },
  },
});
export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;