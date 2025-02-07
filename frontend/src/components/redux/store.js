import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import servicesReduser from "./reducers/services/index"
import DetailsServicesReduser from "./reducers/DetailsServices/index"

const store = configureStore({
  reducer: {
    authReducer: authReducer,
    servicesReduser:servicesReduser,
    DetailsServicesReduser:DetailsServicesReduser
  },
});

export default store;