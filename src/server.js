import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import pkg from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

import http from "http";
import { Server } from "socket.io";

const { PrismaClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = express();
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);

import documentRoutes from "./routes/document.js";
app.use("/document", documentRoutes);

app.get("/", (req, res) => {
  res.send("Realtime Editor Backend is running");
});

// ---------------- SOCKET SETUP ----------------
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join Room
  socket.on("join-document", async (docId) => {
    socket.join(docId);

    try {
      const document = await prisma.document.findUnique({
        where: { id: docId },
      });

      if (!document) {
        console.log("No document found for id:", docId);
        socket.emit("load-document", "");
        return;
      }

      socket.emit("load-document", document.content);
    } catch (err) {
      console.log("LOAD ERROR:", err);
      socket.emit("load-document", "");
    }
  });

  // Receive typing + save to DB + broadcast to others
  socket.on("send-changes", async ({ docId, content }) => {
    try {
      await prisma.document.upsert({
        where: { id: docId },
        update: { content },
        create: {
          id: docId,
          title: "Untitled Document",
          content,
        },
      });

      socket.to(docId).emit("receive-changes", content);
    } catch (err) {
      console.log("SAVE ERROR:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
