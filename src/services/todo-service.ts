import api from "../lib/axios"
import { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo"

export const TodoService = {
  // Get all todos
  getTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>("/tasks")
    return response.data
  },

  // Create a new todo
  createTodo: async (todo: CreateTodoInput): Promise<number> => {
    const response = await api.post<number>("/tasks", todo)
    return response.data
  },

  // Update todo status
  updateTodo: async (id: number, update: UpdateTodoInput): Promise<void> => {
    await api.put(`/tasks/${id}`, update)
  },

  // Delete a todo
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}