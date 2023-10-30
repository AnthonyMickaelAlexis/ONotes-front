import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const useCategoriesSlice = createSlice({
  name: 'useCategories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
        state.token = action.payload
    }
  }
})

export const { setCategories } = useCategoriesSlice.actions;

export default useCategoriesSlice.reducer;