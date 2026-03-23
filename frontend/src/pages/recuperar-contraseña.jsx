import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { sileo } from "sileo";
import { Link } from "react-router-dom";

const RestorePassword = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const [step, setStep] = useState("form"); // form | confirm | reset
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [searchParams] = useSearchParams();
    const [tokenParam, setTokenParam] = useState(null) 

    useEffect(() => {
        const token = searchParams.get("token");

        if (token) {
            setTokenParam(token);
            setStep("reset");
        }
    }, [searchParams]);

    const handlePasswordReset = async(e) => {
        e.preventDefault();

        const rest = await fetch(API_URL+"/api/usuarios/reset-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email }),
        });
        
        const data = await rest.json();

        if(rest.ok){
            setStep("confirm");
        }else{
            sileo.error({title: data.error || "Error al enviar el correo electrónico"});
        }
    };

    const handleNewPassword = async(e) => {
        e.preventDefault();
        
        const rest = await fetch(API_URL+"/api/usuarios/new-password", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({resetToken: tokenParam, newPassword: newPassword, confirmPassword: confirmPassword}),
        });
        
        const data = await rest.json();

        if(rest.ok){
            setStep("done");
        }else{
            sileo.error({title: data.error || "Error al restablecer contraseña"});
        }
        
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white sm:bg-[#f8f9fa] font-sans">
        <div className="w-full max-w-[440px] px-6 py-10 sm:px-12 sm:py-12 bg-white sm:rounded-[4px] sm:shadow-[0_1px_3px_rgba(0,0,0,0.1),0_12px_24px_rgba(0,0,0,0.05)] border-gray-200">

            {/* Branding */}
            <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#2d5a27] rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xs">RV</span>
            </div>
            <span className="text-lg font-bold text-black tracking-tight">
                Raíces de Vida
            </span>
            </div>

            {/* Pantallas según step */}
            {step === "form" && (
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Recuperar contraseña
                </h1>
                <p className="text-[15px] text-gray-600 mb-6">
                Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <form className="space-y-6" onSubmit={handlePasswordReset}>
                <div className="space-y-1">
                    <label className="block text-[13px] font-semibold text-gray-700">
                    Dirección de correo electrónico
                    </label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                    placeholder="nombre@ejemplo.com"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#2d5a27] hover:bg-[#23461f] text-white text-[16px] font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200"
                >
                    Enviar enlace
                </button>
                </form>
            </>
            )}

            {step === "confirm" && (
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Revisa tu correo
                </h1>
                <p className="text-[15px] text-gray-600 mb-6">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>.
                </p>
            </>
            )}

            {step === "reset" && (
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Restablecer contraseña
                </h1>
                <form className="space-y-6" onSubmit={handleNewPassword}>
                <div className="space-y-1">
                    <label className="block text-[13px] font-semibold text-gray-700">
                    Nueva contraseña
                    </label>
                    <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                    placeholder="Tu nueva contraseña"
                    required
                    />
                </div>
                <div className="space-y-1">
                    <label className="block text-[13px] font-semibold text-gray-700">
                    Confirmar contraseña
                    </label>
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-[4px] text-[15px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                    placeholder="Confirma tu nueva contraseña"
                    required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-[#2d5a27] hover:bg-[#23461f] text-white text-[16px] font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200"
                >
                    Guardar contraseña
                </button>
                </form>
            </>
            )}

            {step === "done" && (
            <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Contraseña actualizada
                </h1>
                <p className="text-[15px] text-gray-600 mb-6">
                Tu contraseña ha sido restablecida correctamente.
                </p>
                <Link
                to="/login"
                className="w-full bg-[#2d5a27] hover:bg-[#23461f] text-white text-[16px] font-bold py-3 px-6 rounded-full shadow-sm transition-colors duration-200"
                >
                Ir al inicio de sesión
                </Link>
            </>
            )}
        </div>
        </div>
    );
}

export default RestorePassword;