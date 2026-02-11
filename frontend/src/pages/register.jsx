import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:3001/api/usuarios/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('usuario', JSON.stringify({
        id: data.id,
        nombre: data.nombre,
        email: data.email
      }));
      navigate('/');
    }else
    {
      alert(data.error || 'Error al registrar');
    }
  
    setNombre('');
    setEmail('');
    setPassword('');

  } catch (error) {
    console.error(error);
    alert('Error al registrar');
  }
};

  return (
  <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans">
    
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1542601906990-b4d3fb773b09?auto=format&fit=crop&q=80&w=2000" 
        alt="Naturaleza de fondo" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
    </div>

    <div className="relative z-10 w-full max-w-[380px] mx-4">
      <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl p-6 md:p-8 border border-white/20">
        
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-[#2d5a27] p-1.5 rounded-lg">
              <span className="text-white font-bold text-lg">RV</span>
            </div>
            <h1 className="text-xl font-bold text-[#1a2e1c]">Raíces de Vida</h1>
          </div>
          <h2 className="text-lg font-medium text-gray-600">Crear Cuenta</h2>
          <p className="text-[11px] text-gray-400 text-center mt-1 px-4 leading-tight">
            Únete a nuestra comunidad y comienza a sembrar cambios.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
              Nombre Completo
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input 
                type="text"
                name="nombre"
                placeholder="Escribe tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 focus:border-[#2d5a27] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input 
                type="email"
                placeholder="tucorreo@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 focus:border-[#2d5a27] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
              Contraseña
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input 
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 focus:border-[#2d5a27] outline-none transition-all text-sm"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="group relative w-full inline-flex items-center justify-center px-6 py-3 bg-[#2d5a27] text-white text-sm font-bold rounded-xl overflow-hidden transition-all hover:shadow-md active:scale-[0.98] mt-2 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-[#3a7532] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
            <span className="relative z-10 flex items-center gap-2">
              Continuar
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <div className="pt-2 text-center">
            <p className="text-xs text-gray-500">
              ¿Ya tienes una cuenta? 
              <a href="/login" className="ml-1 font-bold text-[#2d5a27] hover:underline cursor-pointer">
                Inicia sesión
              </a>
            </p>
          </div>
        </form>

      </div>
      
      <p className="text-center text-white/60 text-[10px] mt-4 tracking-[0.2em] uppercase">
        Raíces de Vida — Sembrando Futuro
      </p>
    </div>
  </div>
);
}

export default Register;