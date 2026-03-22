import { useSearchParams, useNavigate } from 'react-router-dom';
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    HomeIcon,
    ArrowPathIcon,
    HeartIcon,
} from '@heroicons/react/24/outline';

const estados = {
    success: {
        icon: CheckCircleIcon,
        iconColor: 'text-[#3B6D11]',
        bgColor: 'bg-[#E8F0D8]',
        borderColor: 'border-[#C0DD97]',
        titulo: '¡Donación recibida!',
        subtitulo: 'Tu apoyo llega a quienes más lo necesitan. Gracias por ser parte del cambio.',
        badge: 'Pago confirmado',
        badgeBg: 'bg-[#E8F0D8] text-[#2D5016]',
    },
    failure: {
        icon: XCircleIcon,
        iconColor: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        titulo: 'El pago no se completó',
        subtitulo: 'Algo salió mal durante el proceso. Puedes intentarlo de nuevo cuando quieras.',
        badge: 'Pago fallido',
        badgeBg: 'bg-red-50 text-red-700',
    },
    pending: {
        icon: ClockIcon,
        iconColor: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        titulo: 'Pago en proceso',
        subtitulo: 'Tu pago está siendo confirmado. Te notificaremos cuando se acredite.',
        badge: 'Pendiente de confirmación',
        badgeBg: 'bg-amber-50 text-amber-700',
    },
};

export default function GraciasPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const status = params.get('status');
    const estado = estados[status] || estados.pending;
    const Icon = estado.icon;

    return (
        <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">

                    <div className={`${estado.bgColor} border-b ${estado.borderColor} px-8 py-10 flex flex-col items-center gap-4`}>
                        <div className={`w-16 h-16 rounded-full bg-white border ${estado.borderColor} flex items-center justify-center`}>
                            <Icon className={`w-8 h-8 ${estado.iconColor}`} />
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${estado.badgeBg}`}>
                            {estado.badge}
                        </span>
                    </div>

                    <div className="px-8 py-7 text-center">
                        <h1 className="text-xl font-bold text-[#1C2B0E] mb-2">
                            {estado.titulo}
                        </h1>
                        <p className="text-sm text-stone-500 leading-relaxed">
                            {estado.subtitulo}
                        </p>
                    </div>

                    {status === 'success' && (
                        <div className="px-8 pb-2">
                            <div className="flex items-center gap-3 bg-[#F0F5E8] border border-[#C0DD97] rounded-xl px-4 py-3">
                                <HeartIcon className="w-4 h-4 text-[#3B6D11] shrink-0" />
                                <p className="text-xs text-[#2D5016]">
                                    Tu donación contribuye directamente al proyecto. Gracias por confiar en Raíces de Vida.
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="px-8 py-6 flex flex-col gap-3">
                        {status === 'failure' && (
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5016] text-white text-sm font-bold hover:bg-[#3B6D11] active:scale-[0.98] transition-all"
                            >
                                <ArrowPathIcon className="w-4 h-4" />
                                Intentar de nuevo
                            </button>
                        )}
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-stone-200 text-stone-600 text-sm font-semibold hover:border-[#3B6D11] hover:text-[#3B6D11] transition-all"
                        >
                            <HomeIcon className="w-4 h-4" />
                            Volver al inicio
                        </button>
                    </div>
                </div>

                <p className="text-center text-xs text-stone-400 mt-4">
                    Pago procesado por Mercado Pago
                </p>
            </div>
        </div>
    );
}