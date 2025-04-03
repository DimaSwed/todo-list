import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '@/widgets/todo-list/api/todoApi'
import { ITodo } from '@/entities/todo/types'

export function useTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos
  })
}

export function useAddTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, todo }: { id: string; todo: Partial<ITodo> }) =>
      todoApi.updateTodo(id, todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

export function useClearCompleted() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: todoApi.clearCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}
