
import express, { Router } from "express";
import { login, logout, register } from "../controllers/authControllers.js";



// router oluştur
const router=express.Router();


//Her route karsılık gelecek fonk belirle
router.post("/register",register)


router.post("login",login)


router.post("/logout",logout)


//routerı dosya dışarısına cıkar
export default router;