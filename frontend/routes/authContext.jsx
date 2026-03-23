import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL+"/api/auth/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          setUsuario(data.user);
        } else {
          setUsuario(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setUsuario(null);
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
