import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import db from "./firebase/firebase-config.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Time Clock');
});

// Buscar todos usuários
app.get('/users', async (req, res) => {
  const ref = db.ref('api-time-clock/users');
  try {
    const snapshot = await ref.once('value');
    const data = snapshot.val();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error });
  }
});

// Buscar usuário por ID
app.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const snapshot = await db.ref(`api-time-clock/users/${userId}`).once("value");
    const user = snapshot.val();

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuário.", details: err });
  }
});

// Criar usuário
app.post('/users', async (req, res) => {
  const { name, email, password, role } = req.body;
  const ref = db.ref("api-time-clock/users");
  const trimmedRole = role.trim()

  try {
    if (!name || !email || !password || !trimmedRole) {
      return res.status(400).json({ message: "Todos os campos devem ser preenchidos." });
    }

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!regex.test(email)) {
      return res.status(400).json({ message: "Email inválido." });
    }
    
    const snapshot = await ref.orderByChild("email").equalTo(email).once("value");
    
    if (snapshot.exists()) {
      return res.status(409).json({ message: "Usuário com esse email já cadastrado." });
    }

    if (password.length <= 4) {
      return res.status(400).json({ message: "Senha curta." });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    if (trimmedRole !== "admin" && trimmedRole !== "employee") {
      return res.status(400).json({ message: "O campo role deve ser 'admin' ou 'employee'." });
    }

    // Gerar um ID único para o usuário com push()
    const userRef = ref.push(); 

    await userRef.set({ name, email, password: hash, role });

    res.status(201).json({ message: "Usuário criado com sucesso." });

  } catch (err) {
    res.status(500).json({ error: "Erro ao criar usuário.", details: err });
  }
});

// **DELETE** - Remover usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const ref = db.ref(`api-time-clock/users/${id}`);

  try {
    const snapshot = await ref.once("value");

    if (snapshot.exists()) {
      await ref.remove(); 
      res.status(200).json({ message: `Usuário ${id} removido com sucesso!` })
    } else {
      res.status(400).json({ message: "ID não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover usuário', details: error });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);

});
