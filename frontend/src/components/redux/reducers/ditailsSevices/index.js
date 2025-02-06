import { createSlice } from "@reduxjs/toolkit";
const ditailsServicseSlice = createSlice({
  name: "ditailsServicse",
  initialState: {
    ditailsServicse: [],
  },
  reducers: {
    setDitailsServicse: (state, action) => {
      state.services = action.payload;
      console.log(action.payload);
      
    },
  },
});
export const { setDitailsServicse } = ditailsServicseSlice.actions;
export default ditailsServicseSlice.reducer;
