import { useState, useEffect } from "react";
import AppShell from "@component/app-shell";
import AddRecipeForm from "@/components/add-recipe-form";
import RecipeCard from "@/components/recipe-card";
import { Recipes } from "@/constants";

const STORAGE_KEY = 'recipes'

function App() {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [...Recipes];
    } catch {
      return [];
    }
  });
  const handleAdd = (newRecipe) => {
    setRecipes((prev) => [...prev, newRecipe]);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));  }, [recipes]);

  return (
    <AppShell>
      <h1>My Recipes</h1>
      <AddRecipeForm onAdd={handleAdd} />
      {recipes.map((recipe, i) => (
        <RecipeCard key={i} {...recipe} />
      ))}
    </AppShell>
  );
}

export default App;
