export const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      todo VARCHAR(255) NOT NULL,
      status BOOLEAN NOT NULL
    );
  `;

export const insertQuery = `
  INSERT INTO todos(todo, status)
  values ($1, $2)
  RETURNING *;
  `;

export const getQuery = `
    SELECT * FROM todos
  `;

export const updateQuery = `
  UPDATE todos
  SET todo = $1, status = $2
  WHERE id = $3
  RETURNING *;
  
  
  `;

export const deleteQuery = `
  DELETE FROM todos
  WHERE id = $1
  RETURNING *;
  `;
