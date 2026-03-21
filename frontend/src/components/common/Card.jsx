import { GlobeAmericasIcon } from "@heroicons/react/24/outline";

const Card = ({ info, acciones }) => {
  const rutaImg = `http://localhost:3001/uploads/${info.portada}`;
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      {/* Imagen con Aspect Ratio */}
      <div className="relative h-52">
        <img
          src={rutaImg}
          className="w-full h-full object-cover"
          alt={info.nombre}
        />
        <span className="absolute top-4 right-4 bg-verde-bosque text-white text-xs font-bold px-3 py-1 rounded-full">
          {info.categoria}
        </span>
      </div>

      {/* Contenido de la Card */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <GlobeAmericasIcon className="w-5 h-5 text-verde-bosque" />
          <span className="text-sm text-gray-500 font-medium">
            {info.ubicacion}
          </span>
        </div>

        <h3 className="text-xl font-bold text-pizarra-azul mb-3">
          {info.nombre}
        </h3>

        {/* BARRA DE SEGUIMIENTO (Progress Bar) */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-verde-bosque">
              {info.porcentaje}% completado
            </span>
            <span className="text-gray-400">
              ${info.financiamiento_actual}/ {info.objetivo}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${info.porcentaje > 100 ? "bg-amber-400" : "bg-verde-bosque"}`} style={{width: `${info.porcentaje > 100 ? "100" : info.porcentaje}%`}}></div>
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="grid grid-cols-1 gap-4">
          {acciones.map((accion, i) => (
            <button
              key={i}
              className="flex items-center justify-center gap-2 border-2 border-verde-bosque text-verde-bosque py-2.5 rounded-lg font-semibold hover:bg-verde-bosque hover:text-white transition-all"
              onClick={accion.onClick}
            >
              {accion.icon && <accion.icon className="w-5 h-5" />}
              {accion.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
