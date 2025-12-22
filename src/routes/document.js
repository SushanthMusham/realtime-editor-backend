import dotenv from "dotenv";
dotenv.config();


import express from "express";
import { authMiddleware } from "../middleware/auth.js";


const router = express.Router();

import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pkgPg from "pg";

const { Pool } = pkgPg;
const { PrismaClient } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});







// create a new document

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const doc = await prisma.document.create({
      data: {
        title,
        content,
        ownerId: userId
      }
    });

    res.json(doc);
  } catch (error) {
    console.error("DOCUMENT CREATE ERROR:", error);
    res.status(500).json({ message: "Failed to create document" });
  }
});


// get MY documents

router.get("/me",authMiddleware, async (req,res) => {
    try {
        const docs = await prisma.document.findMany({
            where: {ownerId: req.user.id},
        });
        res.json(docs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching docs" });
    }
});


// get SIGNLE document

router.get("/:id",authMiddleware, async (req,res) => {
    try {
        const doc = await prisma.document.findUnique({
            where: { id:req.params.id },
        });
        if(!doc) {
            res.status(404).json({ message: "Document not found" });
        }
        res.json(doc);

    } catch (error) {
        res.status(500).json({ error: "Error fetching doc" });
    }
});

export default router;