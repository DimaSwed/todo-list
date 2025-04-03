import { useState, Suspense } from 'react'
import { CircularProgress, Pagination, Stack } from '@mui/material'
import { ITodo, TodoFilter } from '@/entities/todo/types'
import { TodoInput } from '@/widgets/todo-list/ui/TodoInput/TodoInput'
import { TodoList } from '@/widgets/todo-list/ui/TodoList/TodoList'
import { TodoTabs } from '@/widgets/todo-list/ui/TodoTabs/TodoTabs'
import { useTodos } from '@/widgets/todo-list/hooks/useTodos'

export const TodoWidget = () => {
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [page, setPage] = useState(1)
  const [perPage] = useState(5)

  const getFilterParams = () => {
    if (filter === 'all') return
    return {
      completed: filter === 'completed'
    }
  }

  const { data: response } = useTodos({
    page,
    perPage,
    filters: getFilterParams(),
    sort: { createdAt: 'desc' }
  })

  const todos: ITodo[] = response?.data || []
  // console.log(todos)

  const totalPages = response?.pages || 1

  const handleFilterChange = (newFilter: TodoFilter) => {
    setFilter(newFilter)
    setPage(1)
  }

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const activeCount = todos.filter((todo: ITodo) => !todo.completed).length

  return (
    <Stack
      sx={{
        bgcolor: 'background.default',
        width: '100%',
        minHeight: '570px',
        maxWidth: 'fit-content',
        mx: 'auto',
        boxShadow: 5,
        borderRadius: 3,
        p: 3,
        justifyContent: 'space-between',
        gap: 2
      }}
    >
      <Stack>
        <TodoInput />

        <Suspense fallback={<CircularProgress sx={{ margin: '0 auto' }} />}>
          <TodoList todos={todos} />
        </Suspense>
      </Stack>

      <Stack alignSelf={'flex-end'} alignItems={'center'}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="small"
            showFirstButton
            showLastButton
          />
        )}

        <TodoTabs filter={filter} setFilter={handleFilterChange} activeCount={activeCount} />
      </Stack>
    </Stack>
  )
}
