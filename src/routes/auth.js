import dotenv from "dotenv";
dotenv.config();



import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const { PrismaClient } = pkg;
// console.log("DATABASE_URL = ", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });
const result = await prisma.$queryRaw`SELECT current_database(), current_schema();`;
// console.log(result);





const router = express.Router();


// User Registration
router.post("/signup", async (req, res) => {
  try {
  const { name, email, password } = req.body;

  // check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user with hashed password
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  res.json({ message: "User registered successfully",user});

  } catch (error) {
    res.status(500).json({error: error.message });
  }
});


// User Login
router.post("/login", async (req,res) => {
   try {  
     const { email, password } = req.body;

     const user = await prisma.user.findUnique({
       where: { email },
     });

     if (!user) {    
        return res.status(400).json({ message: "Invalid email or password" });
    }

    // compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
        
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });

   } catch (error) {
    res.status(500).json({ error: error.message });
   }
});

export default router;