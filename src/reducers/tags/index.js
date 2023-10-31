import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

export const useTagsSlice = createSlice({
  name: 'useTags',
  initialState,
  reducers: {
    setTags: (state, action) => {
        state.token = action.payload
    }
  }
})

export const { setTags } = useTagsSlice.actions;

export default useTagsSlice.reducer;