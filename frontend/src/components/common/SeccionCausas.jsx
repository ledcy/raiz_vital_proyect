//import  causas from '../../assets/causas';
import { useState, useEffect } from "react";
import Card from './Card';

const SeccionCausas = () => {

    const [data, setData] = useState([]);

    const getProyectos = async () => {
        const rest = await fetch('http://localhost:3001/api/proyectos/get-proyectos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        });

        const resData = await rest.json();

        if (rest.ok) {
            setData(resData);
        } else {
            sileo.error({ title: data.error || 'Error al obtener proyectos' });
        }
    };

    useEffect(() => {
        getProyectos();
    }, []);

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
                    data.map((proyecto)=> {
                        return (
                            <Card key={proyecto.id_proyecto} info={proyecto}></Card>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default SeccionCausas;