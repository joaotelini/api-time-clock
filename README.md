# Documentação da API Time Clock

## Introdução
A API Time Clock é um sistema para gerenciamento de usuários, autenticação e controle de acessos. Ela utiliza Express, Firebase Realtime Database e JWT para autenticação. Esta documentação descreve os endpoints disponíveis e seus respectivos usos.

---

## Configuração
### Variáveis de Ambiente
Certifique-se de configurar as variáveis de ambiente no arquivo `.env`:
- `PORT`: Porta em que o servidor será executado (padrão: 3000).
- `BCRYPT_SALT_ROUNDS`: Número de rounds para hashing de senha (ex.: 10).
- `SECRETKEY`: Chave secreta para geração de tokens JWT.

---

## Endpoints

### 1. **Root**
- **Rota:** `/`
- **Método:** `GET`
- **Descrição:** Rota inicial da API.
- **Resposta:** `API Time Clock`.

---

### 2. **Listar Todos os Usuários**
- **Rota:** `/users`
- **Método:** `GET`
- **Descrição:** Retorna todos os usuários cadastrados.
- **Resposta:**
  - **200:** Lista de usuários.
  - **500:** Erro ao buscar usuários.

---

### 3. **Buscar Usuário por ID**
- **Rota:** `/users/:id`
- **Método:** `GET`
- **Parâmetros:** 
  - `id`: ID do usuário.
- **Descrição:** Retorna os dados de um usuário específico.
- **Resposta:**
  - **200:** Dados do usuário.
  - **404:** Usuário não encontrado.
  - **500:** Erro ao buscar o usuário.

---

### 4. **Login**
- **Rota:** `/login`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Descrição:** Realiza o login do usuário e retorna um token JWT.
- **Validações:**
  - Campos obrigatórios: `email` e `password`.
  - Email deve ser válido.
- **Resposta:**
  - **200:** Login efetuado com sucesso, retorna o token.
  - **400:** Campos inválidos.
  - **401:** Credenciais inválidas.
  - **500:** Erro ao fazer login.

---

### 5. **Criar Usuário**
- **Rota:** `/users`
- **Método:** `POST`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "admin | employee"
  }
  ```
- **Descrição:** Cria um novo usuário no sistema.
- **Validações:**
  - Campos obrigatórios: `name`, `email`, `password`, `role`.
  - Email deve ser válido e único.
  - Senha deve ter mais de 4 caracteres.
  - Role deve ser `admin` ou `employee`.
- **Resposta:**
  - **201:** Usuário criado com sucesso.
  - **400:** Campos inválidos.
  - **409:** Usuário já cadastrado.
  - **500:** Erro ao criar usuário.

---

### 6. **Remover Usuário**
- **Rota:** `/users/:id`
- **Método:** `DELETE`
- **Parâmetros:** 
  - `id`: ID do usuário.
- **Descrição:** Remove um usuário do sistema.
- **Resposta:**
  - **200:** Usuário removido com sucesso.
  - **400:** ID não encontrado.
  - **500:** Erro ao remover usuário.

---

## Respostas Padrão

| Código | Significado                 | Descrição                                   |
|--------|-----------------------------|-------------------------------------------|
| 200    | OK                          | Requisição bem-sucedida.                  |
| 201    | Created                     | Recurso criado com sucesso.               |
| 400    | Bad Request                 | Requisição com dados inválidos.           |
| 401    | Unauthorized                | Credenciais inválidas ou não autorizadas. |
| 404    | Not Found                   | Recurso não encontrado.                   |
| 409    | Conflict                    | Conflito de dados (ex.: email duplicado). |
| 500    | Internal Server Error       | Erro interno do servidor.                 |

---

## Tecnologias Utilizadas
- **Express.js**: Framework para construção de APIs.
- **Firebase Realtime Database**: Banco de dados para armazenamento de usuários.
- **JWT**: Gerenciamento de autenticação via tokens.
- **bcrypt**: Criptografia de senhas.
