import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ITodo } from '@/entities/todo/types'
import { useUpdateTodo } from '@/widgets/todo-list/hooks/useTodos'

interface ITodoItemProps {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItemProps) => {
  const { mutate: toggleTodo } = useUpdateTodo()

  const handleToggle = () => {
    toggleTodo({
      id: todo.id,
      todo: {
        completed: !todo.completed,
        createdAt: todo.createdAt,
        text: todo.text
      }
    })
  }

  return (
    <ListItem disablePadding divider>
      <ListItemButton
        dense
        onClick={handleToggle}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '45px'
        }}
      >
        <ListItemIcon
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Checkbox
            edge="start"
            tabIndex={-1}
            checked={todo.completed}
            disableRipple
            sx={{
              color: 'secondary.main',
              '&.Mui-checked': {
                color: 'secondary.main'
              }
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={todo.text}
          primaryTypographyProps={{
            sx: {
              fontSize: '18px',
              color: todo.completed ? 'primary.main' : 'divider',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
