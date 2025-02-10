import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import servicesReduser from "./reducers/services/index"
import DetailsServicesReduser from "./reducers/DetailsServices/index"
import CartReduser from "./reducers/cart/index"
const store = configureStore({
  reducer: {
    authReducer: authReducer,
    servicesReduser:servicesReduser,
    DetailsServicesReduser:DetailsServicesReduser,
    CartReduser:CartReduser
  },
});

export default store;