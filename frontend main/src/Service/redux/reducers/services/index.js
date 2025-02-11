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
    addServices: (state, action) => {
      state.services = [...state.services, action.payload]; 
    }
  },
});
export const { setServices,addServices } = servicesSlice.actions;
export default servicesSlice.reducer;
