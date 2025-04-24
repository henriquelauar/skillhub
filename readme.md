# 🎯 SkillMatch - Plataforma de Conexão por Habilidades

Este é um projeto de matchmaking de habilidades, onde usuários podem se conectar com outras pessoas interessadas em aprender ou ensinar determinadas habilidades. Criado como estudo prático de React, TypeScript, Express e Prisma.

---

## 🎯 Objetivos de aprendizado

O objetivo principal deste projeto foi praticar:

Integração de frontend e backend com TypeScript.

Utilização de hooks personalizados no React.

Uso de Prisma com PostgreSQL.

Criação de uma API REST com Express.

Organização de pastas e tratamento de erros.

Estilização com Bootstrap e animações com Framer Motion.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- ⚛️ React + TypeScript
- 💅 Bootstrap 5
- 📦 Axios
- 🍞 React-Toastify (notificações)
- 🔄 React Router DOM
- 🎞 Framer Motion (transições animadas)

### Backend
- 🧩 Node.js + Express
- 🧬 TypeScript
- 🛠 Prisma ORM
- 🐘 PostgreSQL
- 🔐 Autenticação via localStorage (token JWT)

---

## 📐 Arquitetura do Projeto

```bash
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── prisma/
│   │   ├── utils/
│   │   └── index.ts
│   └── swaggerConfig.ts
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   └── App.tsx
│   └── public/
```

---

## ⚙️ Como Rodar Localmente

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/skillmatch.git
cd skillmatch
```

### 2. Configurar o Backend

```bash
cd server
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Crie um `.env` com:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/skillmatch"
PORT=3000
```

### 3. Configurar o Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🧪 Endpoints da API

Acesse a documentação Swagger interativa em:

📄 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

Exemplos de rotas:

- `POST /users` – Criar usuário
- `GET /skills/matches/:id` – Buscar possíveis matches por ID
- `POST /matches` – Enviar match
- `GET /matches/:userId` – Buscar matches por status

---

## 📚 Estrutura de Match

Um match acontece apenas quando:
- O usuário A **quer aprender** uma habilidade (`isLearning: true`)
- O usuário B **ensina** essa mesma habilidade (`isLearning: false`)

E vice-versa.

---

## ✅ Funcionalidades

- 🔍 Explorar usuários e habilidades
- ⚖️ Sistema inteligente de possíveis matches
- 💌 Enviar e gerenciar solicitações de match (pendentes, aceitos, recusados)
- 📁 Perfil de usuário com habilidades listadas
- ✅ Botões interativos de "Fazer Match"
- 📊 UI responsiva com Sidebar fixa e Topbar fixa
- 🔐 Autenticação com localStorage

---

## 🧑‍💻 Contribuindo

Contribuições são bem-vindas! Abra uma _issue_ ou envie um _pull request_ com melhorias ou correções.

---
