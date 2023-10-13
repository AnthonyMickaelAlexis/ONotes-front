import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  device: '',
};

export const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setDevice: (state, action) => {
      state.device = action.payload
    }
  }
})

export const { setDevice } = miscSlice.actions;

export default miscSlice.reducer;