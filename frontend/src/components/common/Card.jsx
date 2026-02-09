import { GlobeAmericasIcon, HeartIcon } from '@heroicons/react/24/outline';
// import Card from 'Card'
import imagenCausa from '../../assets/hero.jpg';

const Card = ({info}) => {
    const rutaImg = `/causasImagenes/${info.nombreImagen}`;
    // const rutaImg = new URL(`../../assets/${info.nombreImagen}`, import.meta.url).href;
    console.log(rutaImg)
    return (

        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">

            {/* Imagen con Aspect Ratio */}
            <div className="relative h-52">
                <img
                    src={rutaImg}
                    className="w-full h-full object-cover"
                    alt={info.titulo}
                />
                <span className="absolute top-4 right-4 bg-verde-bosque text-white text-xs font-bold px-3 py-1 rounded-full">
                    {info.categoria}
                </span>
            </div>

            {/* Contenido de la Card */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <GlobeAmericasIcon className="w-5 h-5 text-verde-bosque" />
                    <span className="text-sm text-gray-500 font-medium">{info.ubicacion}</span>
                </div>

                <h3 className="text-xl font-bold text-pizarra-azul mb-3">
                    {info.titulo}
                </h3>

                {/* BARRA DE SEGUIMIENTO (Progress Bar) */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold text-verde-bosque">{info.porcentaje}% completado</span>
                        <span className="text-gray-400">${info.recaudacion}/ {info.meta}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-verde-bosque h-2 rounded-full w-[65%]"></div>
                    </div>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center gap-2 bg-verde-bosque text-white py-2.5 rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                        <HeartIcon className="w-5 h-5" />
                        Donar
                    </button>
                    <button className="flex items-center justify-center gap-2 border-2 border-verde-bosque text-verde-bosque py-2.5 rounded-lg font-semibold hover:bg-verde-bosque hover:text-white transition-all">
                        Ayudar
                    </button>
                </div>
            </div>

        </div>
    )
}


export default Card;