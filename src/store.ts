import {configureStore} from '@reduxjs/toolkit';
import recipesReducer from '@/features/recipes/recipesSlice';
import type {Recipe} from '@/constants/lib/types';

const STORAGE_KEY = 'recipes';

const loadRecipes = (): Recipe[] => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
    preloadedState: {
        recipes: {items: loadRecipes()},
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
