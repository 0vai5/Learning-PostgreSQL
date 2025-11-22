import React, { useState, useRef, useEffect } from "react";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = () => {
    onUpdate(todo.id, todo.todo, !todo.status);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onUpdate(todo.id, editText, todo.status);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md mb-2 shadow-sm group">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.status}
          onChange={handleCheckboxChange}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
        />

        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
              onBlur={() => {
                // Optional: save on blur or cancel
                // setIsEditing(false);
              }}
            />
          </form>
        ) : (
          <span
            className={`flex-1 ${
              todo.status ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.todo}
          </span>
        )}
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none rounded-full hover:bg-gray-100"
        >
          &#8942; {/* Vertical Ellipsis */}
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDelete();
                setShowMenu(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
