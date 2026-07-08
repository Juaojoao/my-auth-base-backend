# 🔐 My Auth Base Backend

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-blue.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-7.8-indigo?style=flat&logo=prisma)](https://www.prisma.io/)
[![Express](https://img.shields.io/badge/Express-5.2-lightgrey?style=flat&logo=express)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)

Esta é uma API REST robusta e modular desenvolvida com **Node.js**, **Express**, **TypeScript**, **Prisma** e **PostgreSQL**. Ela serve como base estruturada (boilerplate) pronta para produção, implementando o fluxo completo de cadastro, autenticação por token JWT e controle de acesso baseado em cargos (RBAC).

---

## 🚀 Tecnologias Utilizadas

O projeto utiliza uma pilha de tecnologias modernas e eficientes:

- **[Express v5.2](https://expressjs.com/)**: Framework web rápido, minimalista e altamente extensível.
- **[TypeScript v6.0](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e produtividade no desenvolvimento.
- **[Prisma v7.8](https://www.prisma.io/)**: ORM de última geração acoplado ao banco PostgreSQL utilizando o adaptador nativo `@prisma/adapter-pg`.
- **[Zod v4.4](https://zod.dev/)**: Validação e parsing de dados em runtime com tipagem estática inferida automaticamente.
- **[zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types)**: Geração automatizada de esquemas Zod a partir do esquema do Prisma.
- **[JSON Web Token (JWT)](https://jwt.io/)**: Mecanismo seguro de autenticação stateless.
- **[BcryptJS](https://github.com/dcodeIO/bcrypt.js)**: Hashing criptográfico de senhas utilizando a técnica de salt.
- **[tsup](https://tsup.egoist.dev/)** & **[tsx](https://tsx.is/)**: Ferramentas ultra-rápidas para build e execução de projetos TypeScript sem overhead de configuração.

---

## 📁 Estrutura de Pastas

A arquitetura do projeto segue princípios de modularidade, separando as responsabilidades de forma clara e limpa:

```text
my-auth-base-backend/
├── prisma/                    # Configurações do Banco de Dados
│   ├── migrations/            # Histórico de alterações do banco de dados (Prisma Migrations)
│   └── schema.prisma          # Definição do modelo de dados e enums do Prisma
│
├── src/                       # Código-fonte principal
│   ├── config/                # Variáveis de ambiente validadas pelo Zod
│   │   └── env.ts
│   │
│   ├── controllers/           # Camada de controle (manipulação de requisições HTTP)
│   │   └── user.controller.ts
│   │
│   ├── generated/             # Tipos e esquemas autogerados pelo Prisma e Zod
│   │   ├── prisma/            # Cliente Prisma gerado
│   │   └── zod/               # Esquemas Zod automáticos com base no schema.prisma
│   │
│   ├── lib/                   # Clientes e conexões de infraestrutura (Ex: Prisma Client)
│   │   └── prisma.ts
│   │
│   ├── middlewares/           # Middlewares (validação de dados, tratamento global de erros)
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── routes/                # Rotas da API
│   │   ├── index.router.ts    # Centralizador de rotas
│   │   └── user.router.ts     # Rotas específicas de usuários
│   │
│   ├── schemas/               # Esquemas Zod customizados para validação de entrada de dados
│   │   └── users/
│   │       └── user.schema.ts
│   │
│   ├── services/              # Regras de negócio e comunicação direta com o banco de dados
│   │   └── user.service.ts
│   │
│   ├── types/                 # Definições de tipos TypeScript customizados
│   │
│   └── index.ts               # Ponto de entrada do servidor Express
│
├── .editorconfig              # Padronização do formato do código entre IDEs
├── .env.example               # Exemplo das variáveis de ambiente necessárias
├── eslint.config.js           # Configurações de Linting com ESLint v10
├── tsconfig.json              # Configurações do compilador TypeScript
└── package.json               # Gerenciador de dependências e scripts do projeto
```

---

## 🛠️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente em sua máquina.

### Pré-requisitos
- **Node.js** instalado (versão igual ou superior a 20.0.0 recomendado)
- Um banco de dados **PostgreSQL** ativo

### Passo 1: Instalar dependências
Clone o repositório e instale todos os pacotes necessários:
```bash
npm install
```

### Passo 2: Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e preencha as variáveis de acordo com o seu ambiente local:
- **`PORT`**: Porta em que o servidor irá rodar (padrão `3000`).
- **`DATABASE_URL`**: String de conexão com o banco de dados PostgreSQL.
  * *Exemplo: `postgresql://user:password@localhost:5432/my_database?schema=public`*
- **`JWT_SECRET`**: Chave de criptografia para assinar os tokens JWT (mínimo de 8 caracteres).
- **`NODE_ENV`**: Ambiente em que a aplicação está rodando (`development`, `production`, `test`).

### Passo 3: Rodar as migrações e gerar os clientes
Execute os comandos do Prisma para rodar as migrations no banco de dados e gerar as estruturas dinâmicas do Prisma Client e Zod Prisma Types:
```bash
# Executa as migrações no banco de dados
npx prisma migrate dev

# Gera os arquivos de cliente no diretório src/generated/
npx prisma generate
```

### Passo 4: Executar a aplicação

#### Em Ambiente de Desenvolvimento (com live reload)
```bash
npm run dev
```
O servidor iniciará e estará pronto para receber requisições na porta especificada (Ex: `http://localhost:3000`).

#### Em Ambiente de Produção (compilar e rodar)
```bash
# Compilar TypeScript para JavaScript otimizado (pasta dist/)
npm run build

# Iniciar a aplicação a partir do código transpilado
npm run start
```

---

## 📋 Scripts Disponíveis

Os comandos abaixo estão configurados no arquivo `package.json`:

* `npm run dev`: Inicia o servidor em modo de desenvolvimento utilizando o `tsx watch` (atualiza automaticamente a cada mudança de código).
* `npm run build`: Compila o projeto utilizando o `tsup` para gerar arquivos JavaScript otimizados na pasta `dist`.
* `npm run start`: Inicia o servidor em produção executando o código JavaScript gerado na build.
* `npm run lint`: Analisa o projeto em busca de problemas de formatação e semântica com o ESLint.
* `npm run lint:fix`: Executa o linter e corrige automaticamente os erros simples encontrados.
* `npm run format`: Formata todos os arquivos TypeScript utilizando o Prettier.

---

## 🔌 API Endpoints (Documentação)

Abaixo estão listados os endpoints expostos pela API:

### 1. Rota Raiz (Health Check)
Verifica se o servidor está ativo.
* **URL**: `/`
* **Método**: `GET`
* **Resposta Esperada (200 OK)**:
  ```text
  Hello from TypeScript Express!
  ```

---

### 2. Cadastro de Usuário
Registra um novo usuário no banco de dados com a senha criptografada.
* **URL**: `/api/user`
* **Método**: `POST`
* **Headers**: `Content-Type: application/json`
* **Corpo da Requisição (JSON)**:
  ```json
  {
    "name": "Maria Silva",
    "email": "maria.silva@example.com",
    "password": "senha_segura_123",
    "role": "CLIENT"
  }
  ```
  *Nota: O campo `role` é opcional e aceita os valores `"CLIENT"` (padrão) e `"ADMIN"`.*
* **Resposta de Sucesso (201 Created)**:
  ```json
  {
    "id": "e2fa51c8-2b81-4bde-8f83-9b8c3d9dfa05",
    "name": "Maria Silva",
    "email": "maria.silva@example.com",
    "role": "CLIENT"
  }
  ```
* **Erros Comuns**:
  * **400 Bad Request** (Validação Zod falhou):
    ```json
    {
      "status": "erro",
      "erros": [
        {
          "campo": "email",
          "mensagem": "E-mail com formato inválido."
        },
        {
          "campo": "password",
          "mensagem": "A senha deve ter pelo menos 6 caracteres."
        }
      ]
    }
    ```
  * **409 Conflict** (E-mail duplicado):
    ```json
    {
      "status": "erro",
      "mensagem": "Email já cadastrado"
    }
    ```

---

### 3. Login / Autenticação
Autentica o usuário e gera um token JWT de acesso com validade de 24 horas.
* **URL**: `/api/user/login`
* **Método**: `POST`
* **Headers**: `Content-Type: application/json`
* **Corpo da Requisição (JSON)**:
  ```json
  {
    "email": "maria.silva@example.com",
    "password": "senha_segura_123"
  }
  ```
* **Resposta de Sucesso (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "e2fa51c8-2b81-4bde-8f83-9b8c3d9dfa05",
      "name": "Maria Silva",
      "email": "maria.silva@example.com",
      "role": "CLIENT"
    }
  }
  ```
* **Erros Comuns**:
  * **401 Unauthorized** (E-mail não cadastrado ou senha incorreta):
    ```json
    {
      "status": "erro",
      "mensagem": "Credenciais inválidas"
    }
    ```

---

## 🔒 Segurança e Práticas Recomendadas

- **Hashing de Senhas**: As senhas dos usuários nunca são armazenadas em texto puro. O BcryptJS aplica salting de 10 rounds para hashing de senhas.
- **Validação de Entrada Rigorosa**: O Zod garante que nenhum dado malformado ou não tipado chegue aos serviços ou banco de dados. Qualquer entrada inválida é interceptada imediatamente na camada de middleware.
- **Variáveis de Ambiente Estritamente Tipadas**: Usando Zod, garantimos que o servidor nem sequer inicialize caso alguma variável de ambiente obrigatória esteja ausente ou com tipo incorreto.
- **Tratamento de Erros Isolado**: Um middleware de erros global previne o vazamento de stack traces internos do Node.js ou Prisma em ambiente de produção, tratando erros conhecidos e retornando status condizentes de forma limpa.

---