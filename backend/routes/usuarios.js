import express from 'express';
import { db } from '../db.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  const sql = 'SELECT id, nombre, password FROM usuarios WHERE nombre = ? AND email = ?';
  db.query(sql, [nombre.trim(), email.trim()], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });

    if (!results || results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado, revise sus datos' });
    }

    const user = results[0];
    if (!user.password) {
      return res.status(500).json({ error: 'Usuario sin contraseña registrada' });
    }

    const match = password === user.password;
    if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

    res.json({ id: user.id, nombre: user.nombre });
  });
});


router.post('/register', (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }
  const consultaExiste = 'SELECT * FROM usuarios WHERE email = ?';

  db.query(consultaExiste, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const sqlInsert = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';

    db.query(sqlInsert, [nombre, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Error al registrar el usuario' });
      }
      
      res.status(201).json({ 
        id: result.insertId, 
        nombre, 
        email 
      });
    });
  });
});


router.get("/ ", (req, res) => {
  
})

export default router;
