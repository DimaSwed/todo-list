export interface ITodo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export type TodoFilter = 'all' | 'active' | 'completed'
