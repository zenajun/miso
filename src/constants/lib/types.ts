export interface Ingredient {
  name: string;
  quantity?: number;      // the ? means optional — today's form doesn't collect this yet
  unit?: string;
  costPerUnit?: number;   // arrives Day 23
}

export interface Recipe {
  id?: string;
  title: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Sweet';
  prepTimeMinutes: number;
  ingredients: Ingredient[];
  instructions: string;
  tags: string[];
}