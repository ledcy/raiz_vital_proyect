import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import image from  '../../public/causasImagenes/causa_6.webp';

function Login() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const rest = await fetch('http://localhost:3001/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password })

    });

    const data = await rest.json();
    console.log(data);

     if(rest.ok) {
      localStorage.setItem('usuario', JSON.stringify(data));
       window.location.href = '/';
     } else {

      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: data.error || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
        confirmButtonText : 'Aceptar',

      });

     }

  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 z-0">
        <img 
          src={image}
          alt="Naturaleza de fondo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[380px] mx-4"> 
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-2xl p-6 md:p-8 border border-white/20">
          
          {/* Logo y Encabezado - AJUSTADO: mb-6 en vez de mb-10 */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-[#2d5a27] p-1.5 rounded-lg">
                <span className="text-white font-bold text-lg">RV</span>
              </div>
              <h1 className="text-xl font-bold text-[#1a2e1c]">Raíces de Vida</h1>
            </div>
            <h2 className="text-lg font-medium text-gray-600">Bienvenido</h2>
            <p className="text-xs text-gray-400">Inicia sesión en tu cuenta</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Nombre
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input 
                  type="text"
                  placeholder="Tu nombre"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email" 
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 focus:border-[#2d5a27] outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Contraseña</label>
                <a href="#" className="text-[10px] font-bold text-[#2d5a27] hover:underline">
                  ¿Olvidaste?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-[#2d5a27] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-[#2d5a27]/10 focus:border-[#2d5a27] outline-none transition-all text-sm"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#2d5a27] text-white text-sm font-bold py-3 rounded-xl shadow-md hover:bg-[#23461f] transform transition-all active:scale-[0.98] mt-2"
            >
              Iniciar Sesión
            </button>

            <div className="pt-2 text-center">
              <p className="text-xs text-gray-500">
                ¿No tienes cuenta? 
                <a href="/register" className="ml-1 font-bold text-[#2d5a27] hover:underline">
                  Regístrate
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
  

export default Login;