import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { todoApi } from '@/widgets/todo-list/api/todoApi'
import { ITodo, PaginatedResponse } from '@/entities/todo/types'

export function useTodos({
  page = 1,
  perPage = 5,
  sort = { createdAt: 'asc' },
  filters = {}
}: {
  page?: number
  perPage?: number
  sort?: { createdAt: 'asc' | 'desc' }
  filters?: { completed?: boolean; title?: string }
} = {}) {
  return useSuspenseQuery<PaginatedResponse<ITodo> & { page: number }>({
    queryKey: ['todos', { page, perPage, sort, filters }],
    queryFn: () => todoApi.getTodos({ page, perPage, sort, filters }),
    staleTime: 1000 * 60,
    retry: 1
  })
}

export function useAddTodo() {
  const queryClient = useQueryClient()

  return useMutation<ITodo, Error, ITodo>({
    mutationFn: todoApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: Error) => {
      console.error('Ошибка при добавлении задачи:', error.message)
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation<ITodo, Error, { id: string; todo: Partial<ITodo> }>({
    mutationFn: async ({ id, todo }) => {
      return await todoApi.updateTodo(id, todo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: Error) => {
      console.error('Ошибка при обновлении задачи:', error.message)
    }
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: Error) => {
      console.error('Ошибка при удалении задачи:', error.message)
    }
  })
}

export function useClearCompleted() {
  const queryClient = useQueryClient()

  return useMutation<{ success: boolean; deletedCount: number }, Error>({
    mutationFn: todoApi.clearCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: Error) => {
      console.error('Ошибка при удалении завершенных задач:', error.message)
    }
  })
}
