import AppShell from '@component/app-shell'
import  RecipeCard  from '@/components/recipe-card'
import { Recipes } from '@/constants'

function App() {
  
  return (
    <AppShell>
      <h1>Welcome to Miso</h1>
      {Recipes.map((recipe) => (
        <RecipeCard key={recipe.title} {...recipe} />
      ))}
      </AppShell>    
  )
}

export default App
