import {Card, CardContent, Typography, Chip} from '@mui/material';
import type {Recipe} from '@/constants/lib/types';

function RecipeCard({title, mealType, prepTimeMinutes, ingredients}: Recipe) {
    const isQuick = prepTimeMinutes <= 15;

    return (
        <Card sx={{mb: 1.5}} variant='outlined'>
            <CardContent>
                <Typography variant='subtitle1' sx={{fontWeight: 600}}>
                    {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    {mealType} · {prepTimeMinutes} min · {ingredients.length}{' '}
                    ingredients
                </Typography>
                {isQuick && (
                    <Chip
                        label='Quick recipe'
                        color='success'
                        size='small'
                        sx={{mt: 1}}
                    />
                )}
            </CardContent>
        </Card>
    );
}

export default RecipeCard;
