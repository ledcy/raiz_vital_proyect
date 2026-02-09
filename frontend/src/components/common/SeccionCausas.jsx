import { GlobeAmericasIcon, HeartIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import imagenCausa from '../../assets/hero.jpg';
import  causas from '../../assets/causas';
import Card from './Card';
const SeccionCausas = () => {
    return (
        // CONTENEDOR PRINCIPAL DE LA SECCIÓN
        <section className="bg-arena py-16 px-4">

            {/* CABECERA DE LA SECCIÓN */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                <h2 className="md:text-5xl font-bold text-pizarra-azul mb-4 font-sans">
                    Nuestras Causas
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Cada proyecto es una semilla de esperanza. Conoce cómo estamos transformando el mundo juntos.
                </p>
            </div>

            {/* GRID DE CARDS (El contenedor de la lista) */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    causas.map((obj, i)=> {
                        return (
                            <Card key={obj.id} info={obj}></Card>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default SeccionCausas;