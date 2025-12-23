# 📝 Realtime Collaborative Editor - Backend

This is the backend for the **Realtime Collaborative Text Editor**.  
It provides:
- WebSocket based realtime collaboration using **Socket.io**
- Persistent storage using **PostgreSQL + Prisma**
- Authentication support (JWT)
- Production deployment ready (Render + Neon DB)

---

## 🚀 Tech Stack
- Node.js
- Express.js
- Socket.io
- PostgreSQL
- Prisma ORM
- Render (Hosting)
- Neon (Cloud PostgreSQL)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repo
```bash
git clone https://github.com/SushanthMusham/realtime-editor-backend
cd realtime-editor-backend

# 📝 Realtime Collaborative Editor - Backend

This is the backend for the **Realtime Collaborative Text Editor**.  
It provides:
- WebSocket based realtime collaboration using **Socket.io**
- Persistent storage using **PostgreSQL + Prisma**
- Authentication support (JWT)
- Production deployment ready (Render + Neon DB)

---

## 🚀 Tech Stack
- Node.js
- Express.js
- Socket.io
- PostgreSQL
- Prisma ORM
- Render (Hosting)
- Neon (Cloud PostgreSQL)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone Repo
```bash
git clone https://github.com/SushanthMusham/realtime-editor-backend
cd realtime-editor-backend

2️⃣ Install Dependencies
npm install

3️⃣ Configure Environment Variables
Create .env in root and add:
DATABASE_URL="your_neon_postgres_url"
JWT_SECRET="your_secret_key"
PORT=5000
4️⃣ Apply Database Migrations
npx prisma migrate deploy
5️⃣ Start Development Server
npm run dev
Server runs on:
http://localhost:5000
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
Backend is deployed on Render:
https://realtime-editor-backend-h48m.onrender.com
📌 Notes
Database auto-creates document entry on first edit
Content sync is instant across users
Works with frontend hosted on Vercel
✨ Author
Sushanth Musham
IIT Bhubaneswar
