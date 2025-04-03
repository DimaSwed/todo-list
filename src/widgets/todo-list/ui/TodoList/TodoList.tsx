import { List, Typography } from '@mui/material'
import { TodoItem } from '@/widgets/todo-list/ui/TodoItem/TodoItem'
import { ITodo } from '@/entities/todo/types'

interface ITodoListProps {
  todos: ITodo[]
}

export const TodoList = ({ todos }: ITodoListProps) => {
  return (
    <List>
      {todos.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ p: 2 }}>
          No tasks found
        </Typography>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </List>
  )
}
