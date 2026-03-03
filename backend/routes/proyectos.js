import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middleware/validacionToken.js";

const router = express.Router();

const regex = /^[a-zA-Z]+$/; 

router.post("/crear-proyecto", verifyToken, (req, res) => {
    const { nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo } = req.body;
    const usuario = req.user;

    if (!nombre || !fecha || !descripcion || !ubicacion || !categoria || !subcategoria || !objetivo) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    if (!regex.test(nombre)){
        return res
        .status(400)
        .json({ error: "El nombre no cumple con el formato solicitado" });
    }

    if (!regex.test(descripcion)){
        return res
        .status(400)
        .json({ error: "La descripción no cumple con el formato solicitado" });
    }

    if (!regex.test(ubicacion)){
        return res
        .status(400)
        .json({ error: "La ubicación no cumple con el formato solicitado" });
    }

    

    const sqlInsert = "INSERT INTO proyecto(id_usuario, nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    db.query(sqlInsert, [usuario.id ,nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo], (err, result) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Error al registrar el proyecto" });
        }

        return res.status(201).json({
            message: "Proyecto creado correctamente"
        });
    });
});

export default router;