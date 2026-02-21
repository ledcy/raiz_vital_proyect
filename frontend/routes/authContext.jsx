import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/auth/verify", {
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