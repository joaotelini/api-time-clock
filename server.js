import express from "express";
import mysql from "mysql2";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const app = express();
const port = 4001;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  }
  console.log("Conectado ao banco de dados MySQL!");
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM Users";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erro ao buscar usuários:", err);
      return res.status(500).send("Erro ao buscar usuários.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Usuário não encontrado.");
    }
    return res.status(200).json(results);
  });
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM Users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      return res.status(500).send("Erro ao buscar usuários.");

    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }
    return res.status(200).json(results);
  });
});

app.post("/users", (req, res) => {
  const { name, email, password, role } = req.body;
  const trimmedRole = role.trim();

  if (!name || !email || !password || !trimmedRole) {
    return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
  }

  if (trimmedRole !== "admin" && trimmedRole !== "employee") {
    return res.status(400).json({ message: "O campo role deve ser 'admin' ou 'employee'." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido." });
  }

  const checkEmailQuery = "SELECT * FROM Users WHERE email = ?";
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao verificar o email." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Usuário com esse email já cadastrado." });
    }

    if (password.length < 5) {
      return res.status(400).json({ message: "A senha deve ter pelo menos 5 caracteres." });
    }

    // Gerando o hash da senha de forma assíncrona
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao gerar hash da senha." });
      }

      // Agora a senha está hashada
      const query = "INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(query, [name, email, hash, trimmedRole], (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Erro ao criar usuário" });
        }
        return res.status(201).json({ message: "Usuário criado com sucesso." });
      });
    });
  });
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM Users WHERE id = ?";

  db.query(query, [userId], (err, results) => {

    if (err) {
      return res.status(500).json({ message: "Erro ao deletar usuário" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  })
});

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
