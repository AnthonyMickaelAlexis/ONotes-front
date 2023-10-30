import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const useSubcategoriesSlice = createSlice({
  name: "useSubcategories",
  initialState,
  reducers: {
    setSubcategories: (state, action) => {
      state.token = action.payload;
    },
    setSubcategory: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSubcategories, setSubcategory } = useSubcategoriesSlice.actions;

export default useSubcategoriesSlice.reducer;
