import {useMemo} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ModuleRegistry, AllCommunityModule, themeQuartz, type ColDef} from 'ag-grid-community';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import type {Recipe} from '@/constants/lib/types';

ModuleRegistry.registerModules([AllCommunityModule]);

function RecipeGrid() {
    const recipes = useSelector((state: RootState) => state.recipes.items);

    const columnDefs: ColDef<Recipe>[] = useMemo(
        () => [
            {field: 'title', headerName: 'Title', flex: 2},
            {field: 'mealType', headerName: 'Meal Type', flex: 1},
            {field: 'prepTimeMinutes', headerName: 'Prep (min)', flex: 1},
            {
                headerName: 'Ingredients',
                flex: 1,
                valueGetter: (params) => params.data?.ingredients.length ?? 0,
            },
        ],
        [],
    );

    return (
        <div style={{height: 400, width: '100%'}}>
            <AgGridReact<Recipe> theme={themeQuartz} rowData={recipes} columnDefs={columnDefs} />
        </div>
    );
}

export default RecipeGrid;
