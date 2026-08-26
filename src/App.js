import { Recipes } from '@/constants'
import { RecipeList } from '@/config.js'

function App() {
  return (
    <>
      <h1>Welcome to Miso</h1>
      <RecipeList recipes={Recipes} />
    </>
  )
}

export default App
