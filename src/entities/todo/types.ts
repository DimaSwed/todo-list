export interface ITodo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export type TodoFilter = 'all' | 'active' | 'completed'

export type PaginatedResponse<T> = {
  data: T[]
  first: number
  items: number
  last: number
  next: number | null
  page: number
  pages: number
  prev: number | null
}
