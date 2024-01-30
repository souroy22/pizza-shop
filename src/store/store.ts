import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import sizeReducer from "./size/sizeReducer";
import pizzaReducer from "./size/pizzaReducer";

const store = configureStore({
  reducer: { authReducer, sizeReducer, pizzaReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
