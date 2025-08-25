
import express, { Router } from "express";



// router oluştur
const router=express.Router();


//Her route karsılık gelecek fonk belirle
router.post("/register",(eq,res)=>{
 res.json({message:"kayıt işlemi"})
})


router.post("login",(eq,res)=>{
 res.json({message:"giriş işlemi"})
})


router.post("/logout",(eq,res)=>{
 res.json({message:"cıkış işlemi"})
})


//routerı dosya dışarısına cıkar
export default router;