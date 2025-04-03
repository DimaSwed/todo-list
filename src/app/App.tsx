import { TodoWidget } from '@/widgets/todo-list'
import { Box, Container, Typography } from '@mui/material'

export function App() {
  return (
    <Box maxWidth="100%" minHeight="100vh" p={4} sx={{ backgroundColor: 'background.paper' }}>
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom>
          Todo List
        </Typography>
        <TodoWidget />
      </Container>
    </Box>
  )
}
