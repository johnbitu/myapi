const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
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
  const { name, email, senha } = req.body;

  console.log('Received data:', name, email, senha);
  // if (!name || !email) {
  //   return res.status(400).json({ error: 'Name and email are required' });
  // }

  db.run('INSERT INTO users (name, email, senha) VALUES (?, ?, ?)', [name, email, senha], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.redirect('/');
  });
});

// Rota de login
app.post('/login', async (req, res) => {
  const { name, senha } = req.body;
  // name = "'" + name + "'"
  // console.log(name,senha);

  // Consultar o banco de dados para obter o hash da senha do usuário
  db.get(`SELECT * FROM users WHERE LOWER(name) = LOWER(?)`, [name], async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erro interno do servidor');
    }

    if (row) {
      // Comparar a senha fornecida com o hash no banco de dados
      const passwordMatch = await bcrypt.compare(senha, row.senha);

      if (passwordMatch) {
        // Usuário autenticado com sucesso
        console.log(name, senha, "if 1");
        return res.status(200).json({ message: 'Login efetuado com sucesso' });
      } else {
        // Senha incorreta
        console.log(name, senha, "else 1");
        return res.status(401).send('Credenciais inválidas');
      }
    } else {
      console.log(name, senha, "else 2");
      // Usuário não encontrado
      return res.status(401).send('Credenciais inválidas');

    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});