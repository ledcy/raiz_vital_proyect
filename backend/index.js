import express from 'express';
import cors from 'cors';
import usuariosRouter from './routes/usuarios.js';

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/api/usuarios', usuariosRouter)
console.log('Rutas de usuarios cargadas', usuariosRouter.stack.map(r => r.route.path));

app.listen(3001, () => {
  console.log('Backend corriendo en puerto 3001');
});
