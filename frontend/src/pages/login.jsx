import { useState } from 'react';
import { sileo } from 'sileo';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../routes/authContext.jsx';

function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUsuario } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rest = await fetch('http://localhost:3001/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await rest.json();

    if (rest.ok) {
      setUsuario(data);
      navigate('/');
      sileo.success({ title: '¡Bienvenido, ' + data.nombre + '!' });
    } else {
      sileo.error({ title: data.error || 'Error al iniciar sesión' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white sm:bg-[#f8f9fa] font-sans">
      
      <div className="w-full max-w-[440px] px-6 py-10 sm:px-12 sm:py-12 bg-white sm:rounded-[4px] sm:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.05)] border-gray-200">
        
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2d5a27] rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">RV</span>
            </div>
            <span className="text-lg font-bold text-black tracking-tight">Raíces de Vida</span>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
          <p className="text-[15px] text-gray-600">
            ¿Eres nuevo aquí? 
            <a href="/register" className="ml-1 text-[#2d5a27] font-semibold hover:underline">
              Crea una cuenta
            </a>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-gray-700">
              Nombre de usuario
            </label>
            <input 
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="Introduce tu nombre"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-gray-700">
              Dirección de correo electrónico
            </label>
            <input
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="block text-[13px] font-semibold text-gray-700">
                Contraseña
              </label>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="Tu contraseña"
              required
            />
          </div>

          <div className="py-1">
            <a href="#" className="text-[14px] font-semibold text-[#2d5a27] hover:underline">
              ¿Has olvidado la contraseña?
            </a>
          </div>

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full bg-[#2d5a27] hover:bg-[#23461f] text-white text-[16px] font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200"
            >
              Continuar
            </button>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
            <p className="text-[12px] text-gray-400 font-medium tracking-wide uppercase">
                Raíces de Vida © 2026
            </p>
        </div>
      </div>

      <footer className="mt-8 hidden sm:block">
        <ul className="flex gap-6 text-[12px] text-gray-500 font-medium">
          <li className="hover:text-black cursor-pointer transition-colors">Ayuda</li>
          <li className="hover:text-black cursor-pointer transition-colors">Condiciones de uso</li>
          <li className="hover:text-black cursor-pointer transition-colors">Privacidad</li>
        </ul>
      </footer>
    </div>
  );
}

export default Login;