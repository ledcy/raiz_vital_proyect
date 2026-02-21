import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/api/auth/verify', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setIsAuth(data.valid);
        setLoading(false);
      })
      .catch(() => {
        setIsAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading){
    return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );
  } 

  if (isAuth) return <Navigate to="/" />;

  return children;
};

export default PublicRoute;