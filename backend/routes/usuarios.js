import express from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/validacionToken.js";

dotenv.config();

const router = express.Router();

const regexNombre = /^[a-zA-Z]+$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

router.post("/login", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (!regexNombre.test(nombre)) {
    return res
      .status(400)
      .json({ error: "El nombre no cumple con el formato solicitado" });
  }

  if (!regexEmail.test(email)) {
    return res
      .status(400)
      .json({
        error: "El correo electrónico no cumple con el formato solicitado",
      });
  }

  if (!regexPassword.test(password)) {
    return res
      .status(400)
      .json({ error: "La contraseña no cumple con el formato solicitado" });
  }

  const sql =
    "SELECT id_usuario, nombre, password FROM usuario WHERE nombre = ? AND email = ?";
  db.query(sql, [nombre.trim(), email.trim()], (err, results) => {
    if (err) return res.status(500).json({ error: "Error del servidor" });

    const user = results[0];

    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado, revise el correo" });
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al verificar la contraseña" });
      }

      if (!result) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        {
          id: user.id_usuario,
          nombre: user.nombre,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000,
      });

      res.json({ id: user.id, nombre: user.nombre });
    });
  });
});

router.post("/register", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }

  if (!regexNombre.test(nombre)) {
    return res
      .status(400)
      .json({ error: "El nombre no cumple con el formato solicitado" });
  }

  if (!regexEmail.test(email)) {
    return res
      .status(400)
      .json({
        error: "El correo electrónico no cumple con el formato solicitado",
      });
  }

  if (!regexPassword.test(password)) {
    return res
      .status(400)
      .json({ error: "La contraseña no cumple con el formato solicitado" });
  }

  const consultaExiste = "SELECT * FROM usuario WHERE email = ?";

  db.query(consultaExiste, [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al consultar la base de datos" });
    }

    if (results.length > 0) {
      return res
        .status(400)
        .json({ error: "El correo electrónico ya está registrado" });
    }

    const sqlInsert =
      "INSERT INTO usuario (nombre, email, password) VALUES (?, ?, ?)";

    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        console.error("Error encriptando la contraseña:", err);
      } else {
        db.query(sqlInsert, [nombre, email, hash], (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error al registrar el usuario" });
          }

          res.status(201).json({
            id: result.insertId,
            nombre,
            email,
          });
        });
      }
    });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Sesión cerrada" });
});

router.get("/users", (req, res) => {
  const sql = "SELECT id_usuario, nombre, email FROM usuario";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener usuarios" });
    }

    res.json(results);
  });
});

export default router;
