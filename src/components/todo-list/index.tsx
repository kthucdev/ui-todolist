import React, { useState, useEffect, useCallback } from "react";
import { Todo } from "../../types/todo";
import { TodoService } from "../../services/todo-service";

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos with error handling and loading state
  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await TodoService.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch todos. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Handle form submission for adding a new todo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim() || !newTodoDescription.trim()) {
      setError("Title and description are required.");
      return;
    }

    try {
      setIsLoading(true);
      await TodoService.createTodo({
        title: newTodoTitle.trim(),
        description: newTodoDescription.trim(),
      });
      await fetchTodos();
      setNewTodoTitle("");
      setNewTodoDescription("");
      setError(null);
    } catch (err) {
      setError("Failed to create todo. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle todo completion status
  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      await TodoService.updateTodo(id, { completed });
      await fetchTodos();
      setError(null);
    } catch (err) {
      setError("Failed to update todo. Please try again.");
      console.error(err);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: number) => {
    try {
      await TodoService.deleteTodo(id);
      await fetchTodos();
      setError(null);
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
        Todo List
      </h1>
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Task title..."
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isLoading}
        />
        <textarea
          placeholder="Task description..."
          value={newTodoDescription}
          onChange={(e) => setNewTodoDescription(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          disabled={isLoading}
          rows={3}
        />
        <button
          type="submit"
          disabled={isLoading || !newTodoTitle.trim() || !newTodoDescription.trim()}
          className="w-full rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:opacity-50 dark:bg-blue-600"
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>
      <div className="max-h-[400px] overflow-y-auto rounded-lg border p-4 dark:border-gray-700">
        {isLoading && todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No todos yet. Add one above!
          </p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const TodoItem = ({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: Todo;
  toggleTodo: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
}) => {
  return (
    <li className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-3 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-700/50">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id, !todo.completed)}
            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <span
            className={`text-sm font-medium ${
              todo.completed
                ? "text-gray-500 line-through dark:text-gray-400"
                : "text-gray-900 dark:text-white"
            }`}
          >
            {todo.title}
          </span>
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="rounded-lg p-1 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="sr-only">Delete todo</span>
        </button>
      </div>
      {todo.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {todo.description}
        </p>
      )}
    </li>
  );
};

export default TodoList;