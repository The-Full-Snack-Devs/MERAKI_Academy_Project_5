import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
    isLoggedIn: localStorage.getItem("token") ? true : false,
    Cart_id: null
  },
  reducers: {
    setLogin: (state, action) => {
      const index = action.payload;
      state.token = index
      state.isLoggedIn = true
      localStorage.setItem("token", index)
    },
    setUserId: (state, action) => {
      const index = action.payload;
      state.userId = index
      localStorage.setItem("userId", index)
      console.log(state.isLoggedIn)
    },
    setLogout: (state, action) => {
      state.token = null
      state.userId = null
      state.isLoggedIn = false
      localStorage.clear()
    },
    setCartId:(state, action) => {
      state.Cart_id = action.payload
    },
  }
});

export const { setLogin, setUserId, setLogout,changeLocation,setCartId} =
 authSlice.actions;

export default authSlice.reducer;