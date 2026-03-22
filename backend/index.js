import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import proyectosRouter from "./routes/proyectos.js";
import campañasRouter from "./routes/campañas.js";
import donacionesRouter from "./routes/donaciones.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

//Api routes para usarios y cerrar sesión
app.use("/api/usuarios", usuariosRouter);
//api route para verificar token
app.use("/api/auth", authRouter);

app.use("/api/proyectos", proyectosRouter);

app.use("/api/campaign", campañasRouter);

app.use("/uploads", express.static("uploads"));

app.use("/api/donacion", donacionesRouter)

app.listen(3001, '0.0.0.0', () => {
  console.log("Backend corriendo en puerto 3001");
});
