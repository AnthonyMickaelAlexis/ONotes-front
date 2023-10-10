import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticle: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { setArticle } = articleSlice.actions;

export default articleSlice.reducer;