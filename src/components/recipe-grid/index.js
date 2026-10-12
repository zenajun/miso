import {useMemo, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ModuleRegistry, AllCommunityModule, themeQuartz} from 'ag-grid-community';
import {useSelector} from 'react-redux';
import {TextField, Box} from '@mui/material';

ModuleRegistry.registerModules([AllCommunityModule]);

function RecipeGrid() {
    const recipes = useSelector((state) => state.recipes.items);
    const [searchText, setSearchText] = useState('');

    const defaultColDef = useMemo(() => ({sortable: true, filter: true, resizable: true}), []);

    const columnDefs = useMemo(
        () => [
            {field: 'title', headerName: 'Title', flex: 2},
            {field: 'mealType', headerName: 'Meal Type', flex: 1},
            {
                field: 'prepTimeMinutes',
                headerName: 'Prep (min)',
                flex: 1,
                cellStyle: (params) => (params.value < 15 ? {backgroundColor: '#e8f5e9', fontWeight: 600} : null),
            },
            {
                headerName: 'Ingredients',
                flex: 1,
                valueGetter: (params) => params.data?.ingredients.length ?? 0,
            },
            {
                colId: 'ingredientSearch',
                hide: true,
                valueGetter: (params) => params.data?.ingredients.map((i) => i.name).join(' ') ?? '',
            },
        ],
        [],
    );

    return (
        <Box>
            <TextField
                label='Search recipes or ingredients'
                size='small'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{mb: 1.5, width: 300}}
            />
            <div style={{height: 400, width: '100%'}}>
                <AgGridReact
                    theme={themeQuartz}
                    rowData={recipes}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    quickFilterText={searchText}
                    includeHiddenColumnsInQuickFilter={true}
                />
            </div>
        </Box>
    );
}

export default RecipeGrid;
