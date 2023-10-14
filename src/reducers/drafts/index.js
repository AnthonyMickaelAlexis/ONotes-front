import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    saveDraft: (state, action) => {
      const index = state.findIndex(e => e.draftId === action.payload.draftId);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    },
    deleteDraft: (state, action) => {
      const index = state.findIndex(e => e.draftId === action.payload);
      if (index !== -1) {
        delete state[index];
      }
    },
  }
})

export const { saveDraft, deleteDraft } = draftsSlice.actions;

export default draftsSlice.reducer;