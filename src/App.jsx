import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AppShell from '@component/app-shell';
import AddRecipeForm from '@/components/add-recipe-form';
import RecipeGrid from '@/components/recipe-grid';

const STORAGE_KEY = 'recipes';

function App() {
    const recipes = useSelector((state) => state.recipes.items);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes]);

    return (
        <AppShell>
            <AddRecipeForm />
            <RecipeGrid />
        </AppShell>
    );
}

export default App;