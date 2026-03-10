import express from "express";
import { db } from "../db.js";
import { verifyToken } from "../middleware/validacionToken.js";
import {upload} from "../middleware/upload.js";
import fs from "node:fs";

const router = express.Router();

const regex = /^[a-zA-Z ]+$/; 

router.post("/crear-proyecto", upload.single('imagen'), verifyToken, (req, res) => {
    const { nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo} = req.body;
    const nombreImagen = req.file.filename;
    const usuario = req.user;

    try {
        
    
    if (!nombre || !fecha || !descripcion || !ubicacion || !categoria || !subcategoria || !objetivo) {
        throw new Error("Todos los campos son requeridos");
    }

    if (!regex.test(nombre)){
        throw new Error("El nombre no cumple con el formato solicitado");
    }

    if (!regex.test(descripcion)){
        throw new Error("La descripción no cumple con el formato solicitado");
    }

    if (!regex.test(ubicacion)){
        throw new Error("La ubicación no cumple con el formato solicitado");
    }

    

    const sqlInsert = "INSERT INTO proyecto(id_usuario, nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";

    db.query(sqlInsert, [usuario.id ,nombre, fecha, descripcion, ubicacion, categoria, subcategoria, objetivo], (err, result) => {
        if (err) {
            throw new Error("Error al registrar el proyecto");
        }

        const idProyecto = result.insertId;

        db.query("INSERT INTO imagenes_proyecto(id_proyecto, nombre_archivo, tipo) VALUES (?, ?, ?)", [idProyecto, nombreImagen, "portada"], (err, result) => {
            if (err) {
                throw new Error("Error al registrar la imagen");
            }
        });

        return res.status(201).json({
            message: "Proyecto creado correctamente"
        });
    });

    } catch (error) {
        // eliminar archivo si hubo error
        if (req.file) {
            fs.unlink(req.file.path, () => {});
        }

        return res.status(400).json({
            error: error.message
        });
    }
});

router.get("/get-proyectos", (req, res) => {
    const sql = "SELECT p.id_proyecto, p.nombre, p.ubicacion, p.objetivo, p.categoria, i.nombre_archivo AS portada FROM proyecto p LEFT JOIN imagenes_proyecto i ON p.id_proyecto = i.id_proyecto AND i.tipo = 'portada';";
    db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener proyectos" });
    }

    res.json(results);
  });
});


export default router;