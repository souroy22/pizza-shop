import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PizzaType = {
  name: string;
  type: string;
  availableSizes: string[];
  base: string[];
  id: string;
};

export type SizeInitialState = {
  pizza: PizzaType[];
};
const initialState: SizeInitialState = {
  pizza: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    getPizza: (state, action: PayloadAction<PizzaType[]>) => {
      state = { ...state, pizza: action.payload };
      return state;
    },
  },
});

export const { getPizza } = pizzaSlice.actions;
export default pizzaSlice.reducer;
