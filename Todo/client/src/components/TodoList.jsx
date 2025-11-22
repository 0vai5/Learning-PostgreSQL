import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onUpdate, onDelete, title }) => {
  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      {title && (
        <h3 className="text-lg font-semibold text-gray-700 mb-3">{title}</h3>
      )}
      <div className="flex flex-col">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
