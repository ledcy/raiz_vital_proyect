import React, { useEffect, useState } from 'react';
import { sileo } from "sileo";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/usuarios/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('No autorizado');
        }

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        sileo.error({title: 'Error al obtener perfil:'});
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, []);

    return (
        <div className="min-h-screen bg-[#FDFDFB] py-12 px-4">
            <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Tarjeta de Encabezado */}
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                    <div className="relative group">
                        <div className="w-28 h-28 bg-[#1D351E] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                            {userData?.nombre ? userData.nombre.charAt(0).toUpperCase() : "U"}
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-stone-200 shadow-sm hover:bg-stone-50 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    
                    <h2 className="mt-6 text-2xl font-semibold text-gray-800 tracking-tight">{userData?.nombre}</h2>
                    <p className="text-stone-500 font-medium text-sm">Miembro desde Octubre 2025</p>
                </div>

                {/* Información Personal - Limpia */}
                <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
                    <div className="px-8 py-6 border-b border-stone-50 flex justify-between items-center bg-white">
                        <h3 className="text-lg font-bold text-[#1D351E] tracking-wide uppercase">Información Personal</h3>
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#1D351E] border border-[#1D351E] rounded-full hover:bg-[#1D351E] hover:text-white transition-all">
                            Editar información
                        </button>
                    </div>

                    <div className="p-8 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#606C38] mb-1">Nombre</label>
                                <p className="text-gray-700 font-medium">{userData?.nombre}</p>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-[#606C38] mb-1">Correo Electrónico</label>
                                <p className="text-gray-700 font-medium">{userData?.email}</p>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-stone-50">
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#606C38] mb-2">Biografía</label>
                            <p className="text-gray-600 leading-relaxed italic text-sm bg-stone-50 p-6 rounded-2xl">
                                "Apasionado por la naturaleza y el bienestar integral. Me uní a Raíces de Vida para apoyar causas de reforestación."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Preferencias */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-[#606C38] rounded-full"></div>
                        <span className="text-sm font-medium text-gray-700 tracking-tight">Notificaciones de nuevas causas</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#606C38]"></div>
                    </label>
                </div>

            </div>
        </div>
    );
}

export default Profile;