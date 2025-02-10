import { createSlice } from "@reduxjs/toolkit";
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
      console.log(action.payload);
      
    },
  },
});
export const { setServices } = servicesSlice.actions;
export default servicesSlice.reducer;
