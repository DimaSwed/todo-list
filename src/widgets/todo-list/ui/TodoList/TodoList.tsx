import { List, Typography } from '@mui/material'
import { TodoItem } from '@/widgets/todo-list/ui/TodoItem/TodoItem'

// Mock

const todos = [
  {
    id: 1,
    text: 'Тестовое задание',
    completed: false
  },
  {
    id: 2,
    text: 'Прекрасный код',
    completed: true
  },
  {
    id: 3,
    text: 'Покрытие тестами',
    completed: false
  }
]

export const TodoList = () => {
  return (
    <List>
      {todos.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ p: 2 }}>
          No tasks found
        </Typography>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} />)
      )}
    </List>
  )
}
