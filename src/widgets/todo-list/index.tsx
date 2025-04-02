import { Stack } from '@mui/material'
import { TodoInput } from '@/widgets/todo-list/ui/TodoInput/TodoInput'
import { TodoList } from '@/widgets/todo-list/ui/TodoList/TodoList'
import { TodoTabs } from '@/widgets/todo-list/ui/TodoTabs/TodoTabs'

export const TodoWidget = () => {
  return (
    <Stack
      sx={{
        bgcolor: 'background.default',
        width: '100%',
        maxWidth: 'fit-content',
        mx: 'auto',
        boxShadow: 5,
        borderRadius: 3,
        p: 3
      }}
    >
      <TodoInput />
      <TodoList />
      <TodoTabs />
    </Stack>
  )
}
