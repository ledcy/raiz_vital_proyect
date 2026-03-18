import express from "express";
import { verifyToken } from "../middleware/validacionToken.js";
import {upload} from "../middleware/upload.js";
import proyecto from "../controllers/Proyectos.js";

const router = express.Router();

router.post("/crear-proyecto", upload.single('imagen'), verifyToken, proyecto.create);
router.get("/get-proyectos", proyecto.retrieve);
router.delete("/delete-project", proyecto.delete);


export default router;