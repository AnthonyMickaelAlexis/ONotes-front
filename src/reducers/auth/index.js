import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: '',
  token: ''
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username,
      state.email = action.payload.email,
      state.token = action.payload.token
    }
  }
})

export const { setUser } = authSlice.actions;

export default authSlice.reducer;