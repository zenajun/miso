import {createSlice, nanoid, type PayloadAction} from '@reduxjs/toolkit';
import type {Recipe} from '@/constants/lib/types';

interface RecipesState {
    items: Recipe[];
}
const initialState: RecipesState = {
    items: [],
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: {
            reducer: (state, action: PayloadAction<Recipe>) => {
                state.items.push(action.payload);
            },
            // Omit creates a type containing every Recipe property except "id".
            // The caller does not need to provide an id because this callback adds one.
            // nanoid() generates a temporary unique ID. This will not be necessary once it's hooked up to MongoDB, as MongoDB will generiate its own _id
            prepare: (recipe: Omit<Recipe, 'id'>) => {
                return {payload: {...recipe, id: nanoid()}};
            },
        },
        // PayloadAction<string> ensures that removeRecipe receives an id string.
        removeRecipe: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((r) => r.id !== action.payload);
        },
        // Here the payload is a full Recipe, so the replacement is type-checked.
        updateRecipe: (state, action: PayloadAction<Recipe>) => {
            const index = state.items.findIndex(
                (r) => r.id === action.payload.id,
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const {addRecipe, removeRecipe, updateRecipe} = recipesSlice.actions;
export default recipesSlice.reducer;
