import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios/profile", {
          credentials: "include", 
        });

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    verificarSesion();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return isAuth ? children : <Navigate to="/login" replace />;
}