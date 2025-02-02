import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";


const store = configureStore({
  reducer: {
    authReducer: authReducer
  },
});

export default store;