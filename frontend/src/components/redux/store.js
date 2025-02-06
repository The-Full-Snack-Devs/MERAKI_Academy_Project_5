import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import servicesReduser from "./reducers/services/index"
import detailServicesReduser from "../DetailsServices";


const store = configureStore({
  reducer: {
    authReducer: authReducer,
    servicesReduser:servicesReduser,
    detailServicesReduser : detailServicesReduser
  },
});

export default store;