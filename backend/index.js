import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js'
import { geminiResponse } from './gemini.js';
const app=express()
dotenv.config();
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth",authRoutes )
app.use("/api/user",userRouter)



app.get('/', (req, res) => {
  res.send('Hello ');
});

app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})
