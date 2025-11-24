-- INNER JOIN

SELECT * FROM users;
INNER JOIN blogs ON user.id = blogs.user_id;

-- LEFT JOIN

SELECT * FROM users;
LEFT JOIN blogs ON user.id = blogs.user_id;