import { apiClient } from '@/shared/api/apiClient'
import { ITodo } from '@/entities/todo/types'

export const todoApi = {
  getTodos: async () => {
    const response = await apiClient.get<ITodo[]>('/todos')
    return response.data
  },
  addTodo: (todo: ITodo) => apiClient.post<ITodo>('/todos', todo),
  updateTodo: (id: number | string, todo: Partial<ITodo>) =>
    apiClient.put<ITodo>(`/todos/${id}`, todo),
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
