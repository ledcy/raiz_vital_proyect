import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        sileo.success({
          title: res.ok ? "Registro exitoso" : "Error al registrar",
          description: res.ok
            ? "Tu cuenta ha sido creada exitosamente."
            : data.error || "Ocurrió un error durante el registro.",
          type: res.ok ? "success" : "error",
          button: {
            title: "Inicia sesión ahora",
            onClick: () => {
              if (res.ok) {
                navigate("/login");
              }
            },
          },
        });
      } else {
        sileo.error({
          title: "Error al registrar",
          description: data.error || "Ocurrió un error durante el registro.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      alert("Error al registrar");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white sm:bg-[#f8f9fa] font-sans">
      <div className="w-full max-w-[440px] px-6 py-10 sm:px-12 sm:py-12 bg-white sm:rounded-[4px] sm:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.05)] border-gray-200">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2d5a27] rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xs">RV</span>
            </div>
            <span className="text-lg font-bold text-black tracking-tight">
              Raíces de Vida
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Crear una cuenta
          </h1>
          <p className="text-[15px] text-gray-600">
            ¿Ya tienes una cuenta?
            <a
              href="/login"
              className="ml-1 text-[#2d5a27] font-semibold hover:underline"
            >
              Inicia sesión
            </a>
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="Tu nombre y apellido"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-gray-700">
              Dirección de correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="nombre@ejemplo.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[13px] font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
              placeholder="Crea una contraseña"
              required
            />
          </div>

          <p className="text-[12px] text-gray-500 leading-relaxed">
            Al hacer clic en "Continuar", aceptas nuestras
            <span className="text-[#2d5a27] cursor-pointer hover:underline mx-1">
              Condiciones de uso
            </span>
            y confirmas que has leído nuestra
            <span className="text-[#2d5a27] cursor-pointer hover:underline mx-1">
              Política de privacidad
            </span>
            .
          </p>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#2d5a27] hover:bg-[#23461f] text-white text-[16px] font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200"
            >
              Continuar
            </button>
          </div>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[12px] text-gray-400 font-medium tracking-wide uppercase">
            Raíces de Vida — Sembrando Futuro
          </p>
        </div>
      </div>

      <footer className="mt-8 hidden sm:block">
        <ul className="flex gap-6 text-[12px] text-gray-500 font-medium">
          <li className="hover:text-black cursor-pointer transition-colors">
            Ayuda
          </li>
          <li className="hover:text-black cursor-pointer transition-colors">
            Condiciones
          </li>
          <li className="hover:text-black cursor-pointer transition-colors">
            Privacidad
          </li>
          <li className="text-gray-300">|</li>
          <li className="text-gray-400">© 2026 Raíces de Vida</li>
        </ul>
      </footer>
    </div>
  );
}

export default Register;
