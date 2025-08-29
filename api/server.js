

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import gigRoutes from "./routes/gigRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

// dotenv kurulumu
dotenv.config();


//express uygulaması oluştur
const app=express();



//isteğin body'sini işle
app.use(express.json())



app.use(cookieParser());


//cors hatalarını önüne geçmek için header ekle
app.use(cors({
  origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true,
}))

// MongoDB bağlantısı
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("✅ Veri tabanı başarıyla bağlandı");
  })
  .catch((err) => {
    console.error("❌ Veri tabanına bağlantı hatası:", err.message);
  });



//routeları oluştur
app.use("/api/auth",authRoutes)
app.use("/api/gig",gigRoutes)


app.listen(process.env.PORT,()=>{
console.log(`✅ Server is running 4044 `);
})