import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "detailsServices",
  initialState: {
    profile: {},
    orders:[]
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload);
      
    },
    setOrders:(state, action)=>{
      state.orders = action.payload;

    }
  }
});
export const { setProfile,setOrders } = profileSlice.actions;
export default profileSlice.reducer;