

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";


// dotenv kurulumu
dotenv.config();


// MongoDB bağlantısı
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("✅ Veri tabanı başarıyla bağlandı");
  })
  .catch((err) => {
    console.error("❌ Veri tabanına bağlantı hatası:", err.message);
  });



//express uygulaması oluştur
const app=express();


//routeları oluştur
app.use("/api/auth",authRoutes)



app.listen(process.env.PORT,()=>{
console.log(`✅ Server is running 4044 `);
})