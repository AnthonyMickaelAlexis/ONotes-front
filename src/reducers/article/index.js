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

export default articleSlice.reducer;

export const setArticle = state => state.article;