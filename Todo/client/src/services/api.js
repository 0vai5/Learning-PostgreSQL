const API_URL = "http://localhost:3000";

export const getTodos = async () => {
  const response = await fetch(`${API_URL}/`);
  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }
  return response.json();
};

export const createTodo = async (todo, status = false) => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo, status }),
  });
  if (!response.ok) {
    throw new Error("Failed to create todo");
  }
  return response.json();
};

export const updateTodo = async (id, todo, status) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todo, status }),
  });
  if (!response.ok) {
    throw new Error("Failed to update todo");
  }
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete todo");
  }
  return response.json();
};
