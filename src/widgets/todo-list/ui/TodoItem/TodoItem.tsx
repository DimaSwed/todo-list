import { Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ITodo } from '@/entities/todo/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/widgets/todo-list/api/todoApi'

interface ITodoItemProps {
  todo: ITodo
}

export const TodoItem = ({ todo }: ITodoItemProps) => {
  const queryClient = useQueryClient()

  const { mutate: toggleTodo } = useMutation({
    mutationFn: () =>
      todoApi.updateTodo(todo.id, {
        completed: !todo.completed,
        createdAt: todo.createdAt,
        text: todo.text
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  return (
    <ListItem disablePadding divider>
      <ListItemButton
        dense
        onClick={() => toggleTodo()}
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
              color: 'divider',
              textDecoration: todo.completed ? 'line-through' : 'none'
            }
          }}
        />
      </ListItemButton>
    </ListItem>
  )
}
