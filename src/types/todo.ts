export interface Todo {
    id: number
    title: string
    description: string
    completed: boolean
  }
  
  export interface CreateTodoInput {
    title: string
    description: string
  }
  
  export interface UpdateTodoInput {
    completed: boolean
  }
  