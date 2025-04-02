import { TodoListPage } from '@/pages/todo'
import { Container, Typography } from '@mui/material'

export function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Todo List
      </Typography>
      <TodoListPage />
    </Container>
  )
}
