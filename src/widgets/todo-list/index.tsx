import { useState } from 'react'
import { Stack } from '@mui/material'
import { ITodo, TodoFilter } from '@/entities/todo/types'
import { TodoInput } from '@/widgets/todo-list/ui/TodoInput/TodoInput'
import { TodoList } from '@/widgets/todo-list/ui/TodoList/TodoList'
import { TodoTabs } from '@/widgets/todo-list/ui/TodoTabs/TodoTabs'
import { useTodos } from '@/widgets/todo-list/hooks/useTodos'

export const TodoWidget = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')

  const { data: response } = useTodos()

  const todos: ITodo[] = response || []
  // console.log(todos)

  const filteredTodos = todos.filter((todo: ITodo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo: ITodo) => !todo.completed).length

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
      <TodoList todos={filteredTodos} />
      <TodoTabs filter={filter} setFilter={setFilter} activeCount={activeCount} />
    </Stack>
  )
}
