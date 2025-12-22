import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";

import pkg from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });




const app = express();



app.use(cors());
app.use(express.json());


import authRoutes from "./routes/auth.js";
app.use("/auth", authRoutes);


import documentRoutes from "./routes/document.js";
app.use("/document", documentRoutes);







app.get("/", (req, res) => {
  res.send("Realtime Editor Backend is running");
});

// const PORT = process.env.PORT || 5000;  

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// this event will be fired when a client connects to the server
// for *me*: refer to NOTION doc to understand more about socket.io events

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // join a document room
  socket.on("join-document", (docId) => {
    socket.join(docId);
    console.log(`User ${socket.id} joined document ${docId}`);
  });

  // listen for changes and broadcast to other clients in the same document room
  socket.on("send-changes", ({ docId, content }) => {
    socket.to(docId).emit("receive-changes", content);
  });

  // listen for saving document
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const PORT = process.env.PORT || 5000;

// start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
