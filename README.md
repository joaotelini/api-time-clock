
# API Time Clock

Esta é uma API construída com Express, MySQL e bcrypt. Ela foi projetada para gerenciar usuários em um sistema de "time clock" (controle de ponto), com funcionalidades de cadastro, listagem, edição e remoção de usuários.

## Funcionalidades

- **Cadastrar um usuário:** Adicione um novo usuário fornecendo informações como nome, e-mail, senha e função (admin ou employee).
- **Listar usuários:** Consulte todos os usuários registrados.
- **Editar usuários:** Edite informações de um usuário de acordo com seu ID.
- **Buscar usuário por ID:** Obtenha informações de um usuário específico utilizando seu ID.
- **Deletar um usuário:** Exclua um usuário da base de dados.

## Tecnologias

- **Express** - Framework web para Node.js.
- **MySQL2** - Cliente MySQL para Node.js.
- **bcrypt** - Biblioteca para hashing de senhas.
- **dotenv** - Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Requisitos

- Node.js (recomendado a versão 16 ou superior)
- MySQL (instalado localmente ou remotamente)

## Instalação

### 1. Clonar o repositório

Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/api-time-clock.git
cd api-time-clock
```

### 2. Instalar dependências

Instale as dependências do projeto:

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=api-time-clock
BCRYPT_SALT_ROUNDS=10
```

Substitua os valores pelas suas configurações locais do banco de dados MySQL e a quantidade de salt rounds para o bcrypt.

### 4. Criar o banco de dados

Certifique-se de que você tenha o MySQL rodando e crie o banco de dados `api-time-clock`. Você pode fazer isso no MySQL com o seguinte comando:

```sql
CREATE DATABASE api-time-clock;
```

Em seguida, crie a tabela `Users`:

```sql
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'employee') NOT NULL
);
```

### 5. Rodar a API

Agora, você pode iniciar o servidor:

```bash
npm start
```

O servidor estará disponível em `http://localhost:4001`.

## Endpoints

### `GET /`  
Retorna uma mensagem simples de boas-vindas.

**Resposta:**

```json
{
  "message": "Hello World!"
}
```

### `GET /users`  
Retorna uma lista de todos os usuários registrados.

**Resposta:**

```json
[
  {
    "id": 1,
    "name": "João",
    "email": "joao@example.com",
    "role": "employee"
  },
  {
    "id": 2,
    "name": "Maria",
    "email": "maria@example.com",
    "role": "admin"
  }
]
```

### `GET /users/:id`  
Retorna os dados de um usuário específico pelo ID.

**Exemplo de URL:**
```
GET /users/1
```

**Resposta:**

```json
{
  "id": 1,
  "name": "João",
  "email": "joao@example.com",
  "role": "employee"
}
```

### `POST /users`  
Cria um novo usuário.

**Exemplo de corpo da requisição:**

```json
{
  "name": "Carlos",
  "email": "carlos@example.com",
  "password": "senha123",
  "role": "employee"
}
```

**Resposta:**

```json
{
  "message": "Usuário criado com sucesso."
}
```

### `DELETE /users/:id`  
Deleta um usuário pelo ID.

**Exemplo de URL:**
```
DELETE /users/1
```

**Resposta:**

```json
{
  "message": "Usuário deletado com sucesso."
}
```

## Testes

Para testar os endpoints, você pode usar ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/), configurando os métodos HTTP e o corpo das requisições conforme descrito acima.

## Contribuição

Contribuições são bem-vindas! Se você tiver alguma sugestão ou correção, fique à vontade para abrir uma **issue** ou **pull request**.

1. Faça o fork do repositório.
2. Crie uma nova branch (`git checkout -b minha-nova-feature`).
3. Faça as alterações e comite (`git commit -am 'Adiciona nova feature'`).
4. Envie para o repositório remoto (`git push origin minha-nova-feature`).
5. Abra uma **pull request**.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.
