import { Router } from "express";
import * as UC from "./user.controller.js";

const router = Router() 

//signup
router.post("/signup", UC.signUp)

//login
router.post("/login", UC.login)

//logout
router.post("/logout", UC.logout)


export default router