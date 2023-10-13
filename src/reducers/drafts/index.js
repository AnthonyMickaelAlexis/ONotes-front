import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    setDrafts: (state, action) => {
      state.push(action.payload)
    },
    saveDraft: (state, action) => {
      const index = state.findIndex(e => e.draftId === action.payload.draftId);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state[index] = action.payload;
      }
    }
  }
})

export const { setDraft, saveDraft } = draftsSlice.actions;

export default draftsSlice.reducer;