import {createSlice, nanoid} from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: (recipe) => ({payload: {...recipe, id: nanoid()}}),
        },
        removeRecipe: (state, action) => {
            state.items = state.items.filter((recipe) => recipe.id !== action.payload);
        },
        updateRecipe: (state, action) => {
            const index = state.items.findIndex((recipe) => recipe.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const {addRecipe, removeRecipe, updateRecipe} = recipesSlice.actions;
export default recipesSlice.reducer;