-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)
-- CREATE TABLE
--     category (
--         id INTEGER PRIMARY KEY,
--         name TEXT UNIQUE
--     );

SELECT * FROM category;

COMMIT;