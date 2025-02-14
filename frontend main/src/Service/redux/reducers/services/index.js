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
    },
    updateServices: (state, action) => {
      const newValue = action.payload[0];
      
      state.services = state.services.map((o) => {
        if (newValue.id === o.id) {
         return {
          ...o,
          name:newValue.name,
          description:newValue.description
          
         } ;
        }
        return o;
      });
    },
    deleteServices: (state, action) => {
      state.services = state.services.filter((o) => o.id != action.payload);
    },
  },
});
export const { setServices,addServices,updateServices,deleteServices } = servicesSlice.actions;
export default servicesSlice.reducer;
