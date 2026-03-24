import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/authContext.jsx";
import { sileo } from "sileo";

function ParaCreadores() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showForm, setShowForm] = useState(false);
  const [showFormCampaign, setShowFormCampaign] = useState(false);

  const navigate = useNavigate();

  const { usuario } = useAuth();

  const clickbutton = () => {
    if (!usuario) {
      navigate("/login");
      sileo.info({
        title: "Alerta",
        description: "Debes iniciar sesión para registrar un proyecto.",
      });
      return;
    }

    if (showForm == false) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  const clickbuttonCampaign = () => {
    if (!usuario) {
      navigate("/login");
      sileo.info({
        title: "Alerta",
        description: "Debes iniciar sesión para registrar una campaña.",
      });
      return;
    }

    if (showFormCampaign == false) {
      setShowFormCampaign(true);
    } else {
      setShowFormCampaign(false);
    }
  };

  //VALORES PROYECTO
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [subcategoria, setSubcategoria] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [imagen, setImagen] = useState(null);

  //VALORES CAMPAÑA
  const [nombreCampaña, setNombreCampaña] = useState("");
  const [descripcionCampaña, setDescripcionCampaña] = useState("");
  const [ubicacionCampaña, setUbicacionCampaña] = useState("");
  const [categoriaCampaña, setCategoriaCampaña] = useState("");
  const [subcategoriaCampaña, setSubcategoriaCampaña] = useState("");

  const handleSubmitProject = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nombre", nombre);
    formData.append("fecha", fecha);
    formData.append("descripcion", descripcion);
    formData.append("ubicacion", ubicacion);
    formData.append("categoria", categoria);
    formData.append("subcategoria", subcategoria);
    formData.append("objetivo", objetivo);
    formData.append("imagen", imagen);

    const rest = await fetch(API_URL + "/api/proyectos/crear-proyecto", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await rest.json();

    if (rest.ok) {
      sileo.success({ title: data.message });
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      sileo.error({ title: data.error || "Error al crear proyecto" });
    }
  };

  const handleSubmitCampaign = async (e) => {
    e.preventDefault();

    const rest = await fetch(API_URL + "/api/campaign/create-campaign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        nombreCampaña,
        descripcionCampaña,
        ubicacionCampaña,
        categoriaCampaña,
        subcategoriaCampaña,
      }),
    });

    const data = await rest.json();

    if (rest.ok) {
      sileo.success({ title: data.message });
      setTimeout(() => {
        location.reload();
      }, 3000);
    } else {
      sileo.error({ title: data.error || "Error al crear campaña" });
    }
  };

  return (
    <section className="bg-white py-16 px-8 md:px-20 font-sans text-[#1a2e1a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6 text-[#1a2e1a]">
              Crea experiencias <br />
              <span className="text-[#3d5a3d]">con propósito.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Buscamos creadores que deseen transformar el bienestar en acciones
              concretas. Al registrar tu evento en nuestra plataforma, conectas
              con una comunidad comprometida con la sostenibilidad y el
              crecimiento personal.
            </p>

            {usuario?.tipo == "usuario" && (
              <button
                onClick={clickbutton}
                className="bg-[#1a2e1a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2d4d2d] transition-all shadow-lg"
              >
                Registrar nuevo proyecto
              </button>
            )}

            {usuario?.tipo == "institucion" && (
              <>
                <button
                  onClick={clickbutton}
                  className="bg-[#1a2e1a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2d4d2d] transition-all shadow-lg"
                >
                  Registrar nuevo proyecto
                </button>
                <button
                  onClick={clickbuttonCampaign}
                  className="bg-[#1a2e1a] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2d4d2d] transition-all shadow-lg"
                >
                  Registrar nueva campaña de voluntariado
                </button>
              </>
            )}
          </div>

          <div className="relative">
            <div className="bg-[#f3f5f3] rounded-2xl h-80 w-full flex items-center justify-center border border-gray-100">
              <p className="text-gray-400 italic">
                Espacio para ilustración o fotografía
              </p>
            </div>
          </div>
        </div>

        <div
          className={`${
            showForm ? "block" : "hidden"
          } transition-all duration-500 ease-in-out mt-10`}
        >
          <div className="bg-[#f9fbf9] border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl md:text-2xl font-bold">
                Detalles del Evento
              </h3>
              <button
                onClick={() => clickbutton()}
                className="text-gray-400 hover:text-red-500 transition-colors p-2"
              >
                ✕ <span className="hidden sm:inline">Cerrar</span>
              </button>
            </div>

            {/* El grid cambia de 1 columna (default) a 2 columnas en md: */}
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
              onSubmit={handleSubmitProject}
            >
              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Nombre del Evento
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Taller de Reforestación"
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white"
                />
              </div>

              {/* Este campo ocupa las 2 columnas en pantallas grandes */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Descripción breve
                </label>
                <textarea
                  rows="3"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  placeholder="Cuéntanos sobre el impacto de este evento..."
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white"
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Ubicación / Link
                </label>
                <input
                  type="text"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                  placeholder="Presencial o Virtual"
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Categoría
                </label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white text-gray-700"
                >
                  <option value="">Selecciona una opción</option>
                  <option>Sostenibilidad</option>
                  <option>Bienestar</option>
                  <option>Educación</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subcategoría
                </label>
                <select
                  value={subcategoria}
                  onChange={(e) => setSubcategoria(e.target.value)}
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white text-gray-700"
                >
                  <option value="">Selecciona una opción</option>
                  <option>Sostenibilidad</option>
                  <option>Bienestar</option>
                  <option>Educación</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Objetivo (Meta)
                </label>
                <input
                  type="number"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  placeholder="5000"
                  className="w-full p-3 md:p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1a2e1a] bg-white"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Imagen del proyecto
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImagen(e.target.files[0])}
                  className="w-full p-2 md:p-3 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1a2e1a] file:text-white hover:file:bg-[#2d4d2d] cursor-pointer"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#3d5a3d] text-white py-4 rounded-xl font-bold hover:bg-[#2d4d2d] hover:shadow-lg active:scale-[0.98] transition-all"
                >
                  Publicar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParaCreadores;
