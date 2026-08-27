import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';

const mealTypes = ['All recipes', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Sweet'];

function AppShell({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1">
            miso
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            width: 220,
            borderRight: '1px solid #e0e0e0',
            p: 2,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
            Meal type
          </Typography>
          {mealTypes.map((type) => (
            <Typography key={type} sx={{ py: 0.5, cursor: 'pointer' }}>
              {type}
            </Typography>
          ))}
        </Box>

        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>
          <Container maxWidth={false}>{children}</Container>
        </Box>
      </Box>
    </Box>
  );
}

export default AppShell;