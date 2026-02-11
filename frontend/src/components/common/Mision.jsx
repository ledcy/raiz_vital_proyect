import { Bird, Heart, Globe, DollarSign } from 'lucide-react';

const PilaresMision = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-verde-bosque font-bold tracking-[0.2em] text-xs uppercase">
            Apoya las diferentes causas
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-pizarra-azul mt-4 font-sans max-w-2xl mx-auto leading-tight">
            Creemos que podemos salvar más vidas contigo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <Bird size={40} className="text-pizarra-azul stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-pizarra-azul mb-3">Esperanza</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum is simply free text available in the market websites.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
              <Heart size={40} className="text-pizarra-azul stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-pizarra-azul mb-3">Solidaridad</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum is simply free text available in the market websites.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-yellow-50 rounded-2xl flex items-center justify-center mb-6">
              <Globe size={40} className="text-pizarra-azul stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-pizarra-azul mb-3">Paz</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum is simply free text available in the market websites.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
              <DollarSign size={40} className="text-pizarra-azul stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-bold text-pizarra-azul mb-3">Donación</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Lorem ipsum is simply free text available in the market websites.
            </p>
          </div>

        </div>

        <div className="text-center mt-16">
          <a href="/about-us">
            <button className="cursor-pointer bg-verde-bosque text-white px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
              Sobre nosotros
            </button>
          </a>
        </div>

      </div>
    </section>
  );
};

export default PilaresMision;