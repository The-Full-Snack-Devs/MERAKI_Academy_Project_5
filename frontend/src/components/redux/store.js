import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import servicesReduser from "./reducers/services/index"


const store = configureStore({
  reducer: {
    authReducer: authReducer,
    servicesReduser:servicesReduser
  },
});

export default store;