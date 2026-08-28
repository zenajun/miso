import { useState } from 'react';
import { Box, TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Sweet'];

function AddRecipeForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [mealType, setMealType] = useState('Dinner');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const ingredients = ingredientsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((name) => ({ name })); // quantity/unit/costPerUnit come later, Day 23

    onAdd({
      title,
      mealType,
      prepTimeMinutes: Number(prepTime) || 0,
      ingredients,
      instructions,
      tags: [],
    });

    // reset for the next entry
    setTitle('');
    setIngredientsText('');
    setPrepTime('');
    setInstructions('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3, maxWidth: 480 }}
    >
      <TextField
        label="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
      />

      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <TextField
          label="Prep time (min)"
          type="number"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Meal type</InputLabel>
          <Select
            value={mealType}
            label="Meal type"
            onChange={(e) => setMealType(e.target.value)}
          >
            {mealTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Ingredients (one per line)"
        value={ingredientsText}
        onChange={(e) => setIngredientsText(e.target.value)}
        multiline
        rows={4}
        size="small"
      />

      <TextField
        label="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        multiline
        rows={3}
        size="small"
      />

      <Button type="submit" variant="contained">
        Add recipe
      </Button>
    </Box>
  );
}

export default AddRecipeForm;