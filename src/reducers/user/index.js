import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: ''
}

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
        state.token = action.payload
    }
  }
})

export const { setUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;