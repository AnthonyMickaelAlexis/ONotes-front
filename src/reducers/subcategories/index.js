import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const useSubcategoriesSlice = createSlice({
  name: "useSubcategories",
  initialState,
  reducers: {
    setSubcategory: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setSubcategory } = useSubcategoriesSlice.actions;

export default useSubcategoriesSlice.reducer;
