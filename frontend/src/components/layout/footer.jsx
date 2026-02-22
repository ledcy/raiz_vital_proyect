import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#fdfbf7] text-[#1a2e1c] border-t border-[#2d5a27]/10">
      <div className="max-w-7xl mx-auto px-8 py-20">
        
        {/* Sección Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Lado Izquierdo: Eslogan y Botón con contraste fuerte */}
          <div className="lg:col-span-7 space-y-10">
            <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] tracking-tight">
              Creciendo junto <br /> 
              <span className="italic text-[#2d5a27]">a tu bienestar.</span>
            </h2>
            
            <div>
              <button className="bg-[#1a2e1c] text-[#fdfbf7] px-10 py-4 rounded-full font-semibold text-lg hover:bg-[#2d5a27] transition-all duration-300 shadow-lg shadow-[#1a2e1c]/10">
                Contactar ahora
              </button>
            </div>
          </div>

          {/* Lado Derecho: Navegación Estilo Editorial */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-[#2d5a27] font-bold uppercase tracking-[0.2em] text-sm">Navegación</h3>
              <ul className="flex flex-col space-y-4 font-medium text-lg">
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Inicio</a></li>
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Proyectos</a></li>
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Galería</a></li>
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-[#2d5a27] font-bold uppercase tracking-[0.2em] text-sm">Social</h3>
              <ul className="flex flex-col space-y-4 font-medium text-lg">
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-[#2d5a27] transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Línea de cierre y Copyright */}
        <div className="mt-24 pt-8 border-t border-[#1a2e1c]/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-60 font-medium">
          <p>© 2026 Raíces de Vida. Construyendo un futuro sostenible.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#2d5a27] underline underline-offset-4 decoration-[#2d5a27]/30">Privacidad</a>
            <a href="#" className="hover:text-[#2d5a27] underline underline-offset-4 decoration-[#2d5a27]/30">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;