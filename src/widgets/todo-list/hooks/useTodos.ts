import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'
import { todoApi } from '@/widgets/todo-list/api/todoApi'
import { ITodo } from '@/entities/todo/types'

export function useTodos() {
  return useSuspenseQuery<ITodo[]>({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
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
