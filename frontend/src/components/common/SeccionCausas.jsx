//import  causas from '../../assets/causas';
import { useState, useEffect } from "react";
import Card from './Card';
import CardSimple from './SimpleCard';
import { HeartIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { sileo } from "sileo";
import { useNavigate } from "react-router-dom";

const SeccionCausas = () => {

    const [dataProjects, setProjectsData] = useState([]);
    const [dataCampaigns, setCampaignsData] = useState([]);
    const [mostrarCards, setMostrarCards] = useState(false);
    const [tipoVista, setTipoVista] = useState("proyectos"); 

    const projectsMostar = mostrarCards ? dataProjects : dataProjects.slice(-3);

    const navigate = useNavigate();

    const getProyectos = async () => {
        const rest = await fetch('http://localhost:3001/api/proyectos/get-proyectos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        });

        const resData = await rest.json();

        if (rest.ok) {
            setProjectsData(resData);
        } else {
            sileo.error({ title: data.error || 'Error al obtener proyectos' });
        }
    };

    const getCampaigns = async () => {
        const rest = await fetch('http://localhost:3001/api/campaign/get-campaign', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
        });

        const resData = await rest.json();

        if (rest.ok) {
            setCampaignsData(resData);
        } else {
            sileo.error({ title: resData.error || 'Error al obtener campañas' });
        }
    };

    const inscripcionCampaña = async (id_campaña) => {
        const rest = await fetch('http://localhost:3001/api/campaign/create-campaign-registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({id_campaña})
        });

        const data = await rest.json();

        if(rest.ok){
            sileo.success({title: "Registro exitoso"})
        }else{
            sileo.error({title: data.error || "Error al registrarse"});
        }
    };

    useEffect(() => {
        getProyectos();
        getCampaigns();
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

            <div className="flex justify-center gap-4 mb-8">
                <button
                onClick={() => setTipoVista("proyectos")}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    tipoVista === "proyectos"
                    ? "bg-[#1D351E] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                >
                Proyectos
                </button>
                <button
                onClick={() => setTipoVista("campañas")}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                    tipoVista === "campañas"
                    ? "bg-[#1D351E] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                >
                Campañas
                </button>
            </div>

            {/* GRID DE CARDS (El contenedor de la lista) */}
            {tipoVista === "proyectos" ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataProjects.map((proyecto) => (
                    <Card
                    key={proyecto.id_proyecto}
                    info={proyecto}
                    acciones={[
                        { texto: "Patrocina este proyecto", icon: HeartIcon, onClick: () => navigate(`/donar?id=${proyecto.id_proyecto}`)}
                    ]}
                    />
                ))}
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dataCampaigns.map((campaña) => (
                    <CardSimple 
                    key={campaña.id}
                    info={campaña} 
                    acciones={[
                        { texto: "Participa como voluntario", icon: PencilIcon, onClick: () => inscripcionCampaña(campaña.id_campaña) }
                    ]}
                    />
                ))} 
                </div>
            )}
            {
                dataProjects.length > 3 && (
                    <div className="flex justify-center mt-10">
                        <button
                onClick={() => setMostrarCards(!mostrarCards)}
                className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
                {mostrarCards ? "Ver menos" : "Ver más"}
            </button>
                    </div>
                )
            }
        </section>
    );
};

export default SeccionCausas;