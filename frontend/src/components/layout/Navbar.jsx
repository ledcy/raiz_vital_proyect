import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useAuth } from "../../../routes/authContext.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario } = useAuth();

  async function handleLogout() {
    try {
      const restApi = await fetch("http://localhost:3001/api/usuarios/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await restApi.json();

      if (restApi.ok) {
        window.location.href = "/";
      } else {
        console.error(
          "Error al cerrar sesión:",
          data.error || "Error desconocido",
        );
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <nav className="bg-white/99 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-pizarra-azul hover:text-verde-bosque transition-colors font-medium"
          >
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-verde-bosque rounded-full flex items-center justify-center">
                <span className="text-white font-bold">RV</span>
              </div>
              <span className="text-xl font-bold text-pizarra-azul tracking-tight">
                Raíces <span className="text-verde-bosque">de Vida</span>
              </span>
            </div>
          </Link>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            <Link to="/" className="hover:text-verde-bosque transition-colors">
              Inicio
            </Link>
            <a href="#" className="hover:text-verde-bosque transition-colors">
              Causas
            </a>
            <Link
              to="/about-us"
              className="hover:text-verde-bosque transition-colors"
            >
              Nosotros
            </Link>
            <Link
              to="/para-creadores"
              className="hover:text-verde-bosque transition-colors"
            >
              Para los creadores
            </Link>

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${menuAbierto ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {menuAbierto && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setMenuAbierto(false)}
                    ></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-sm rounded-[1.5rem] shadow-xl border border-gray-100 z-20 overflow-hidden">
                      <div className="py-2">
                        <Link
                          to="/perfil"
                          className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-[#f0f5f0] hover:text-[#2d5a27]"
                        >
                          <span className="font-medium">Mi Perfil</span>
                        </Link>
                        <div className="border-t border-gray-100 my-1 mx-4"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <span className="font-bold uppercase tracking-wider text-[11px]">
                            Cerrar Sesión
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="group relative inline-flex items-center justify-center px-4 py-2 bg-[#2d5a27] text-white text-sm font-semibold rounded-full overflow-hidden transition-all duration-300"
              >
                Iniciar Sesión
              </Link>
            )}
            <button>
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Botón Hamburguesa Móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-verde-bosque focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in-down pb-4">
          <div className="px-4 pt-2 pb-3 space-y-1 text-center">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-600 hover:text-verde-bosque font-medium"
            >
              Inicio
            </Link>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-verde-bosque font-medium"
            >
              Causas
            </a>
            <Link
              to="/about-us"
              className="block px-3 py-2 text-gray-600 hover:text-verde-bosque font-medium"
            >
              Nosotros
            </Link>
            <Link
              to="/para-creadores"
              className="block px-3 py-2 text-gray-600 hover:text-verde-bosque font-medium border-b border-gray-50 pb-4"
            >
              Para los creadores
            </Link>

            {/* Sección de Usuario en Móvil */}
            <div className="pt-4 mt-2">
              {usuario ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-[#2d5a27] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {usuario.nombre.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-pizarra-azul font-bold">
                      {usuario.nombre}
                    </span>
                  </div>
                  <Link
                    to="/perfil"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-2 text-gray-600 bg-gray-50 rounded-lg font-medium"
                  >
                    Mi Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full py-2 text-red-500 bg-red-50 rounded-lg font-bold text-xs uppercase tracking-widest"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-3 bg-[#2d5a27] text-white rounded-full font-bold shadow-md active:scale-95 transition-transform"
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
