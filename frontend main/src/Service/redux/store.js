import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import servicesReduser from "./reducers/services/index"
import DetailsServicesReduser from "./reducers/DetailsServices/index"
import CartReduser from "./reducers/cart/index"
import partReduser from "./reducers/PartDash/index";

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    servicesReduser:servicesReduser,
    DetailsServicesReduser:DetailsServicesReduser,
    CartReduser:CartReduser,
    partReduser:partReduser,    
  },
});

export default store;