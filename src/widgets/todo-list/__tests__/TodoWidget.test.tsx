import { render, screen, fireEvent } from '@testing-library/react'
import { TodoWidget } from '@/widgets/todo-list/index'
import { useTodos } from '@/widgets/todo-list/hooks/useTodos'
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material'
import { vi } from 'vitest'
import type { PaginatedResponse, ITodo } from '@/entities/todo/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

vi.mock('@/widgets/todo-list/hooks/useTodos', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/widgets/todo-list/hooks/useTodos')>()

  return {
    ...actual,
    useTodos: vi.fn(),
    useAddTodo: vi.fn().mockReturnValue({
      mutate: vi.fn(),
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      isLoading: false,
      isError: false,
      error: null,
      isSuccess: false,
      status: 'idle',
      data: null,
      variables: null,
      context: null,
      isIdle: true,
      isLoadingError: false,
      isRefetchError: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0
    })
  }
})

const mockTodo: ITodo = {
  id: '1',
  text: 'Test Task',
  completed: false,
  createdAt: '3 апреля 2025 г. в 09:00:58'
}

const mockResponse: PaginatedResponse<ITodo> & { page: number } = {
  data: [mockTodo],
  pages: 1,
  first: 1,
  items: 1,
  last: 1,
  next: null,
  prev: null,
  page: 1
}

const mockUseTodosReturnValue = {
  data: mockResponse,
  error: null,
  isError: false,
  isLoading: false,
  isSuccess: true,
  refetch: vi.fn(),
  status: 'success',
  fetchStatus: 'idle',
  isLoadingError: false,
  isRefetchError: false,
  dataUpdatedAt: 0,
  errorUpdatedAt: 0,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isInitialLoading: false,
  isPending: false,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isPaused: false,
  isRefetching: false,
  isStale: false
} as const

describe('TodoWidget', () => {
  beforeEach(() => {
    vi.mocked(useTodos).mockReturnValue(mockUseTodosReturnValue)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('должен рендерить компонент', () => {
    vi.mocked(useTodos).mockReturnValue({
      ...mockUseTodosReturnValue,
      data: {
        ...mockResponse,
        data: [],
        pages: 2
      }
    })
    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<CircularProgress role="progressbar" />}>
          <TodoWidget />
        </Suspense>
      </QueryClientProvider>
    )

    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('должен изменять фильтр задач', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<CircularProgress role="progressbar" />}>
          <TodoWidget />
        </Suspense>
      </QueryClientProvider>
    )

    fireEvent.click(screen.getByText('Active'))
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('должен изменять страницу пагинации', async () => {
    vi.mocked(useTodos).mockReturnValue({
      ...mockUseTodosReturnValue,
      data: {
        ...mockResponse,
        pages: 3,
        page: 2
      }
    })

    render(
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<CircularProgress role="progressbar" />}>
          <TodoWidget />
        </Suspense>
      </QueryClientProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /next/i }))
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument()
  })
})
