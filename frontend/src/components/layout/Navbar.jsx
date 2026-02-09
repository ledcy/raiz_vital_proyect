import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/99 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">

                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 bg-verde-bosque rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">RV</span>
                        </div>
                        <span className="text-xl font-bold text-pizarra-azul tracking-tight">
                            Raíces <span className="text-verde-bosque">de Vida</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-verde-bosque transition-colors">Inicio</a>
                        <a href="#" className="hover:text-verde-bosque transition-colors">Causas</a>
                        <a href="#" className="hover:text-verde-bosque transition-colors">Nosotros</a>
                        <button className="bg-verde-bosque text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all shadow-md shadow-verde-bosque/20">
                            Iniciar Sesión
                        </button>
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
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Inicio</a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Causas</a>
                        <a href="#" className="block px-3 py-2 text-gray-600 hover:text-verde-bosque">Nosotros</a>
                        <button className="w-full mt-2 bg-verde-bosque text-white px-6 py-2 rounded-full">
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;