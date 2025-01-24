
# Documentação da API Time Clock

## Introdução

A API Time Clock é um sistema para gerenciamento de usuários, autenticação e controle de acessos. Ela utiliza **Express**, **Firebase Realtime Database** e **JWT** para autenticação. Este documento descreve os endpoints disponíveis, os parâmetros aceitos e exemplos de uso.

---

## Configuração

### Requisitos

- Node.js (>=14.0.0)
- Firebase configurado no projeto
- Arquivo `.env` com as variáveis de ambiente necessárias

### Variáveis de Ambiente

Certifique-se de configurar as variáveis de ambiente no arquivo `.env`:

- `PORT`: Porta do servidor (padrão: 4000).
- `BCRYPT_SALT_ROUNDS`: Número de rounds para o hashing de senha (ex.: 10).
- `SECRETKEY`: Chave secreta usada para gerar tokens JWT.

Exemplo de arquivo `.env`:
```env
PORT=4000
BCRYPT_SALT_ROUNDS=10
SECRETKEY=sua-chave-secreta
```

---

## Endpoints

### 1. **Rota Inicial**
- **Método:** `GET`
- **URL:** `/`
- **Descrição:** Rota de teste que verifica se a API está ativa.
- **Resposta:**
  ```json
  {
    "message": "API Time Clock"
  }
  ```

---

### 2. **Listar Todos os Usuários**
- **Método:** `GET`
- **URL:** `/users`
- **Descrição:** Retorna todos os usuários cadastrados no sistema.
- **Resposta:**
  - **200:** Lista de usuários no formato JSON.
  - **500:** Erro interno ao buscar os usuários.

Exemplo de resposta (200):
```json
{
  "user1": {
    "name": "João",
    "email": "joao@email.com",
    "role": "admin"
  },
  "user2": {
    "name": "Maria",
    "email": "maria@email.com",
    "role": "employee"
  }
}
```

---

### 3. **Buscar Usuário por ID**
- **Método:** `GET`
- **URL:** `/users/:id`
- **Parâmetros:**
  - `id` (na URL): ID do usuário.
- **Descrição:** Retorna os dados de um usuário específico.
- **Resposta:**
  - **200:** Dados do usuário.
  - **404:** Usuário não encontrado.
  - **500:** Erro interno.

---

### 4. **Login**
- **Método:** `POST`
- **URL:** `/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Descrição:** Realiza o login do usuário e retorna um token JWT.
- **Validações:**
  - O email deve ser válido e cadastrado.
  - A senha deve corresponder à senha do usuário.
- **Resposta:**
  - **200:** Login bem-sucedido com o token JWT.
  - **401:** Credenciais inválidas.
  - **500:** Erro interno.

---

### 5. **Criar Usuário**
- **Método:** `POST`
- **URL:** `/users`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string",
    "role": "admin | employee"
  }
  ```
- **Descrição:** Cria um novo usuário.
- **Validações:**
  - Todos os campos são obrigatórios.
  - O email deve ser único e válido.
  - A senha deve ter mais de 4 caracteres.
  - O campo `role` deve ser `admin` ou `employee`.
- **Resposta:**
  - **201:** Usuário criado com sucesso.
  - **400:** Campos inválidos ou senha curta.
  - **409:** Usuário já cadastrado.
  - **500:** Erro ao criar usuário.

---

### 6. **Remover Usuário**
- **Método:** `DELETE`
- **URL:** `/users/:id`
- **Parâmetros:**
  - `id` (na URL): ID do usuário.
- **Descrição:** Remove um usuário do sistema.
- **Resposta:**
  - **200:** Usuário removido com sucesso.
  - **400:** ID não encontrado.
  - **500:** Erro interno.

---

## Respostas Padrão

| Código | Significado                 | Descrição                                   |
|--------|-----------------------------|---------------------------------------------|
| 200    | OK                          | Requisição bem-sucedida.                   |
| 201    | Created                     | Recurso criado com sucesso.                |
| 400    | Bad Request                 | Requisição com dados inválidos.            |
| 401    | Unauthorized                | Credenciais inválidas ou não autorizadas.  |
| 404    | Not Found                   | Recurso não encontrado.                    |
| 409    | Conflict                    | Conflito de dados (ex.: email duplicado).  |
| 500    | Internal Server Error       | Erro interno do servidor.                  |

---

## Tecnologias Utilizadas

- **Express.js**: Framework para construção de APIs.
- **Firebase Realtime Database**: Banco de dados para armazenamento de usuários.
- **JWT**: Gerenciamento de autenticação via tokens.
- **bcrypt**: Criptografia de senhas.
