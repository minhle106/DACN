import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import systemReducer from "./reducer/systemSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    system: systemReducer,
  },
});

export default store;
