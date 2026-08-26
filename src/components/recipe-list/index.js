import RecipeCard from '@/components/recipe-card'

function RecipeList({ recipes }) {
  return recipes.map(({ title, mealType, prepTime }) => (
    <RecipeCard
      key={title}
      title={title}
      mealType={mealType}
      prepTime={prepTime}
    />
  ))
}

export default RecipeList
