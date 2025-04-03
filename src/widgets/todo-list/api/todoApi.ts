import { apiClient } from '@/shared/api/apiClient'
import { ITodo, PaginatedResponse } from '@/entities/todo/types'

export const todoApi = {
  // getTodos: async () => {
  //   const response = await apiClient.get<ITodo[]>('/todos')
  //   return response.data
  // },
  getTodos: async ({
    page = 1,
    perPage = 10,
    sort = { createdAt: 'asc' },
    filters = {}
  }: {
    page?: number
    perPage?: number
    sort?: { createdAt: 'asc' | 'desc' }
    filters?: { completed?: boolean }
  } = {}) => {
    const sortParam = sort.createdAt === 'asc' ? 'createdAt' : '-createdAt'
    const completedFilter = filters.completed !== undefined ? `&completed=${filters.completed}` : ''

    const response = await apiClient.get<PaginatedResponse<ITodo>>(
      `/todos?_page=${page}&_per_page=${perPage}&_sort=${sortParam}${completedFilter}`
    )
    return { ...response.data, page }
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
