import { GlobeAmericasIcon } from "@heroicons/react/24/solid";

const CardSimple = ({ info, acciones = [] }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
      {/* Encabezado con categoría */}
      <div className="relative p-4 border-b border-gray-100">
        <span className="absolute top-4 right-4 bg-verde-bosque text-white text-xs font-bold px-3 py-1 rounded-full">
          {info.categoria}
        </span>
        <h3 className="text-xl font-bold text-pizarra-azul">{info.nombre}</h3>
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <GlobeAmericasIcon className="w-5 h-5 text-verde-bosque" />
          <span className="text-sm text-gray-500 font-medium">
            {info.ubicacion}
          </span>
        </div>

        <p className="text-gray-600 text-[15px] leading-relaxed flex-grow">
          {info.descripcion}
        </p>

        {/* BOTONES DE ACCIÓN */}
        {acciones.length > 0 && (
          <div className="grid grid-cols-1 gap-4 mt-auto pt-4">
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
        )}
      </div>
    </div>
  );
};

export default CardSimple;