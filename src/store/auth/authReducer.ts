import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customLocalStorage } from "../../utils/localStorage";

type UserType = {
  name: string;
  email: string;
  isAdmin: boolean;
};

export type AuthInitialState = {
  isLoggedIn: boolean;
  user: UserType;
};
const initialState: AuthInitialState = {
  isLoggedIn: false,
  user: { name: "", email: "", isAdmin: false },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserType>) => {
      state = { ...state, isLoggedIn: true, user: action.payload };
      return state;
    },
    signup: (state, action: PayloadAction<UserType>) => {
      customLocalStorage.setData("user", action.payload);
      state = { ...state, isLoggedIn: true, user: action.payload };
      return state;
    },
    getUser: (state) => {
      const user = customLocalStorage.getData("user");
      if (!user) {
        state = { ...state, isLoggedIn: false };
      } else {
        console.log("User", user);
        state = { ...state, isLoggedIn: true, user };
      }
      return state;
    },
  },
});

export const { login, signup, getUser } = authSlice.actions;
export default authSlice.reducer;
