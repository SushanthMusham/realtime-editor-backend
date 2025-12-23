# 📝 Realtime Collaborative Editor - Backend

This is the backend for the **Realtime Collaborative Text Editor**.

It provides:
- WebSocket based realtime collaboration using **Socket.io**
- Persistent storage using **PostgreSQL + Prisma**
- Authentication support (JWT)
- Production deployment ready (Render + Neon DB)

---

## 🚀 Tech Stack

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=white)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repo
```bash
git clone [https://github.com/SushanthMusham/realtime-editor-backend](https://github.com/SushanthMusham/realtime-editor-backend)
cd realtime-editor-backend

### 2️⃣ Install Dependencies
```bash
npm install


3️⃣ Configure Environment Variables

Create a .env file in the root directory and add:

Code snippet
DATABASE_URL="your_neon_postgres_url"
JWT_SECRET="your_secret_key"
PORT=5000


4️⃣ Apply Database Migrations

Bash
npx prisma migrate deploy


5️⃣ Start Development Server

Bash
npm run dev

Server runs on: http://localhost:5000


🔌 Socket Events
Client → Server

Event	Description
join-document	Join a document room
send-changes	Broadcast editor changes
save-document	Persist content to DB


Server → Client

Event	Description
load-document	Sends initial content
receive-changes	Updates other users live


🏗️ Production
Backend is deployed on Render: https://realtime-editor-backend-h48m.onrender.com


📌 Notes
Database auto-creates document entry on first edit

Content sync is instant across users

Works with frontend hosted on Vercel


✨ Author
Sushanth Musham


IIT Bhubaneswar
