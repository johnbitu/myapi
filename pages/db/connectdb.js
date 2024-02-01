const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();
const port = 5500;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('database.db');

// Criar tabela
// db.run(`
//   CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT
//   )
// `);

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ users: rows });
  });
});

app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // if (!name || !email) {
  //   return res.status(400).json({ error: 'Name and email are required' });
  // }

  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email ], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});