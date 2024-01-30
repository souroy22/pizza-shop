import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SizeType = {
  label: string;
  id: string;
};

export type SizeInitialState = {
  sizes: SizeType[];
};
const initialState: SizeInitialState = {
  sizes: [],
};

export const sizeSlice = createSlice({
  name: "size",
  initialState,
  reducers: {
    getAllSizes: (state, action: PayloadAction<SizeType[]>) => {
      state = { ...state, sizes: action.payload };
      return state;
    },
    addNewSize: (state, action: PayloadAction<SizeType>) => {
      state = { ...state, sizes: [action.payload, ...state.sizes] };
      return state;
    },
    updateSize: (state, action: PayloadAction<SizeType>) => {
      const newSizes = [];
      for (let size of state.sizes) {
        if (size.id === action.payload.id) {
          size = action.payload;
        }
        newSizes.push(size);
      }
      return { ...state, sizes: newSizes };
    },
    deleteSize: (state, action: PayloadAction<string>) => {
      const newSizes = state.sizes.filter((size) => size.id !== action.payload);
      return { ...state, sizes: newSizes };
    },
  },
});

export const { getAllSizes, addNewSize, updateSize, deleteSize } =
  sizeSlice.actions;
export default sizeSlice.reducer;
