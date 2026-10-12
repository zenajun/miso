import {configureStore} from '@reduxjs/toolkit';
import recipesReducer from '@/features/recipes/recipesSlice';

const STORAGE_KEY = 'recipes';

function loadRecipes() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        return JSON.parse(saved).map((recipe) => ({
            ...recipe,
            ingredients: normalizeIngredients(recipe.ingredients),
        }));
    } catch {
        return [];
    }
}

function normalizeIngredients(ingredients) {
    if (typeof ingredients === 'string') {
        return ingredients
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .map((name) => ({name}));
    }
    if (Array.isArray(ingredients)) {
        return ingredients.map((i) => (typeof i === 'string' ? {name: i} : i));
    }
    return [];
}
export const store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
    preloadedState: {
        recipes: {items: loadRecipes()},
    },
});