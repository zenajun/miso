const RecipeCard = ({ title, mealType, prepTime }) => {
  // Reason: decide if this counts as a "quick" recipe
  const isQuick = prepTime <= 15;

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '8px',
    backgroundColor: isQuick ? '#f0fff4' : '#fff',
  };
  console.log('RecipeCard props:', { title, mealType, prepTime, isQuick });
  // Act: return the JSX that represents this decision
  return (
    <div style={cardStyle}>
      <strong>{title}</strong>
      <p style={{ margin: '4px 0', color: '#666' }}>
        {mealType} · {prepTime} min
      </p>
      {isQuick && (
        <span style={{ color: '#2e7d32', fontSize: '13px' }}>
          Quick recipe
        </span>
      )}
    </div>
  );
}

export default RecipeCard;