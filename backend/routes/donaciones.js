import express from "express";
import { verifyToken } from "../middleware/validacionToken.js";
import { donar } from "../controllers/Donaciones.js";
const router = express.Router();

router.post("/donar", verifyToken, donar);

export default router;