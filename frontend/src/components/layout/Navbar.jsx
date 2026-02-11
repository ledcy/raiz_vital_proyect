import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')) || null);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('usuario');
        setUsuario(null);
        navigate('/');
    }

    return (
        <nav className="bg-white/99 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    

                    <Link to="/" className="text-pizarra-azul hover:text-verde-bosque transition-colors font-medium">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="w-10 h-10 bg-verde-bosque rounded-full flex items-center justify-center">
                                <span className="text-white font-bold">RV</span>
                            </div>
                            <span className="text-xl font-bold text-pizarra-azul tracking-tight">
                                Raíces <span className="text-verde-bosque">de Vida</span>
                            </span>
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                        <Link to="/" className="hover:text-verde-bosque transition-colors">Inicio</Link>
                        <a href="#" className="hover:text-verde-bosque transition-colors">Causas</a>
                        <Link to="/about-us" className="hover:text-verde-bosque transition-colors">Nosotros</Link>
                          {usuario ? (
        <div className="relative inline-block text-left">
            <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="group flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-full hover:border-[#2d5a27] transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
            >
            <div className="w-8 h-8 bg-[#2d5a27] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-semibold text-pizarra-azul hidden md:block">
                {usuario.nombre}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${menuAbierto ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
            </button>

            {menuAbierto && (
            <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuAbierto(false)}></div>
                
                <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-sm rounded-[1.5rem] shadow-xl border border-gray-100 z-20 overflow-hidden transform origin-top-right transition-all">
                <div className="py-2">
                    
                    <a
                    title='Mi perfil'
                    href="/perfil"
                    className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-[#f0f5f0] hover:text-[#2d5a27] transition-colors group cursor-pointer"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-[#2d5a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Mi Perfil</span>
                    </a>

                    <div className="border-t border-gray-100 my-1 mx-4"></div>

                    <button
                    title='Cerrar Sesión'
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors group cursor-pointer"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 group-hover:text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-bold uppercase tracking-wider text-[11px]">Cerrar Sesión</span>
                    </button>
                    
                </div>
                </div>
            </>
            )}
        </div>
) : (
  <a
    href="/login"
    className="group relative inline-flex items-center justify-center px-4 py-2 bg-[#2d5a27] text-white text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-md active:scale-95 cursor-pointer"
  >
    <span className="absolute inset-0 w-full h-full bg-[#3a7532] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>
    <span className="relative z-10 flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
      Iniciar Sesión
    </span>
  </a>
)}

                        <button>
                            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>

                    

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-verde-bosque focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
                        <Link to="/" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Inicio</Link>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Causas</a>
                        <Link to="/about-us" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Nosotros</Link>
                        
                        <button className="w-full mt-2 bg-verde-bosque text-white px-6 py-2 rounded-full">
                           
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;