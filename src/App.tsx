import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import AppShell from '@component/app-shell';
import AddRecipeForm from '@/components/add-recipe-form';
import RecipeCard from '@/components/recipe-card';

const STORAGE_KEY = 'recipes';

function App() {
    const recipes = useSelector((state: RootState) => state.recipes.items);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
    }, [recipes]);

    return (
        <AppShell>
            <AddRecipeForm />
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
            ))}
        </AppShell>
    );
}

export default App;
