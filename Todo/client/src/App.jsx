import React, { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./services/api";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      // The API returns { message: "...", todos: [...] }
      // Sort todos by id to keep order consistent
      const sortedTodos = (data.todos || []).sort((a, b) => a.id - b.id);
      setTodos(sortedTodos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (text) => {
    try {
      const data = await createTodo(text);
      // The API returns { message: "...", todoId: { ... } }
      // Wait, looking at server code:
      // insertQuery returns RETURNING *
      // res.json({ ..., todoId: insertTodo.rows[0] })
      // So todoId is actually the todo object.
      const newTodo = data.todoId;
      setTodos([...todos, newTodo]);
    } catch (err) {
      console.error("Failed to add todo", err);
      // Optionally show error to user
    }
  };

  const handleUpdateTodo = async (id, text, status) => {
    try {
      // Optimistic update
      const oldTodos = [...todos];
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, todo: text, status } : t))
      );

      await updateTodo(id, text, status);
      // If we wanted to be strictly correct we could re-fetch or use the response
      // const data = await updateTodo(id, text, status);
      // setTodos(todos.map(t => t.id === id ? data.todo : t));
    } catch (err) {
      console.error("Failed to update todo", err);
      // Revert on failure (would need to store previous state)
      fetchTodos();
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Optimistic update
      setTodos(todos.filter((t) => t.id !== id));
      await deleteTodo(id);
    } catch (err) {
      console.error("Failed to delete todo", err);
      fetchTodos();
    }
  };

  const incompleteTodos = todos.filter((todo) => !todo.status);
  const completedTodos = todos.filter((todo) => todo.status);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Todo App
        </h1>

        <TodoInput onAdd={handleAddTodo} />

        {loading && (
          <p className="text-center text-gray-500">Loading todos...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            <TodoList
              title="Incomplete"
              todos={incompleteTodos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />

            <TodoList
              title="Completed"
              todos={completedTodos}
              onUpdate={handleUpdateTodo}
              onDelete={handleDeleteTodo}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
