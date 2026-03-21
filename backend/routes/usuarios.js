import express from "express";
import { verifyToken } from "../middleware/validacionToken.js";
import usuario from "../controllers/Usuarios.js";

const router = express.Router();

router.post("/login", usuario.login);
router.post("/register", usuario.create);
router.post("/logout", usuario.logout);
router.get("/users", usuario.retrieve_users);
router.get("/profile", verifyToken, usuario.retrieve_profile);
router.put("/reset-password", usuario.create_password_reset);
router.put("/new-password", usuario.update_password);

export default router;
