import { apiClient } from '@/shared/api/apiClient'
import { ITodo } from '@/entities/todo/types'

export const todoApi = {
  getTodos: async () => {
    const response = await apiClient.get<ITodo[]>('/todos')
    return response.data
  },
  addTodo: async (todo: ITodo) => {
    const response = await apiClient.post<ITodo>('/todos', todo)
    return response.data
  },
  updateTodo: async (id: string, todo: Partial<ITodo>) => {
    const response = await apiClient.patch<ITodo>(`/todos/${id}`, todo)
    return response.data
  },
  deleteTodo: async (id: string) => {
    const response = await apiClient.delete(`/todos/${id}`)
    return response.data || {}
  },
  clearCompleted: async () => {
    const response = await apiClient.get<ITodo[]>('/todos')
    const completedTodos = response.data?.filter((todo) => todo.completed) || []

    if (completedTodos.length === 0) {
      return { success: true, deletedCount: 0 }
    }

    const deletePromises = completedTodos.map((todo) => apiClient.delete(`/todos/${todo.id}`))

    await Promise.all(deletePromises)
    return { success: true, deletedCount: completedTodos.length }
  }
}
