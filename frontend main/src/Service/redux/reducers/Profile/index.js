import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "detailsServices",
  initialState: {
    profile: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      console.log(action.payload);
      
    },
  },
});
export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;