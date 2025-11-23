-- C: INSERT DATA

INSERT INTO todos (todo, status)
values ('Learn SQL', 'pending') 
RETURNING *;

-- R: SELECT DATA

SELECT * FROM todos;

-- U: UPDATE DATA

UPDATE todos
SET
    todo = 'New updated todo',
    status = 'New updated status'
WHERE
    id = 'FOR UNIQUE IDENTIFICATION' 
RETURNING *;

-- D: DELETE DATA

DELETE FROM todos 
WHERE id = 'FOR UNIQUE IDENTIFICATION' 
RETURNING *;