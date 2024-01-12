-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)
-- CREATE TABLE
--     category (
--         id INTEGER PRIMARY KEY,
--         name TEXT UNIQUE
--     );

-- SELECT * FROM category;

SELECT * FROM blog;

-- DELETE FROM users WHERE id = 2;
-- DELETE FROM users WHERE id = 3;
-- DELETE FROM users WHERE id = 4;
-- DELETE FROM users WHERE id = 5;
-- DELETE FROM users WHERE id = 6;
-- DELETE FROM users WHERE id = 7;
-- DELETE FROM users WHERE id = 8;

-- SELECT * FROM users;

-- DROP TABLE users;
-- DROP TABLE category;
-- DROP TABLE blog;


COMMIT;