import { createSlice } from "@reduxjs/toolkit";
const detailsServicesSlice = createSlice({
  name: "detailsServices",
  initialState: {
    detailsServices: [],
  },
  reducers: {
    setDetailsServices: (state, action) => {
      state.detailsServices = action.payload;
      console.log(action.payload);
      
    },
  },
});
export const { setDetailsServices } = detailsServicesSlice.actions;
export default detailsServicesSlice.reducer;