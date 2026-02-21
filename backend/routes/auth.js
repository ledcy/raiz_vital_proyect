import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/verify', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ valid: false });
  }
});

export default router;