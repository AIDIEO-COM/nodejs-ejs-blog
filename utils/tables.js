// Define table creation queries
const usersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
  )
`;
const categoryTableQuery = `
CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
)
`;

const blogTableQuery = `
  CREATE TABLE IF NOT EXISTS blog (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      image TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES category(id)
  )
`;

const userInsertQuery = `
INSERT INTO users (name, email, password)
VALUES (?, ?, ?)
`

module.exports = {
  usersTableQuery,
  blogTableQuery,
  categoryTableQuery,
  userInsertQuery
}