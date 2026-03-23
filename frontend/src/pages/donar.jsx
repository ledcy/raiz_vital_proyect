import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    HeartIcon,
    MapPinIcon,
    TagIcon,
    CurrencyDollarIcon,
    PhotoIcon,
    CheckCircleIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const MONTOS_SUGERIDOS = [50, 100, 200, 500];

export default function DonarPage() {
    const [monto, setMonto] = useState(null);
    const [montoPersonalizado, setMontoPersonalizado] = useState('');
    const [nombre, setNombre] = useState('');
    const [loading, setLoading] = useState(false);
    const [proyecto, setProyecto] = useState(null);
    const [loadingProyecto, setLoadingProyecto] = useState(true);

    const [params] = useSearchParams();
    const idProyecto = params.get('id');

    useEffect(() => {
        if (!idProyecto) return;
        const getDatosProyecto = async () => {
            setLoadingProyecto(true);
            try {
                const res = await fetch(
                    `http://localhost:3001/api/proyectos/get-proyectos?idProyecto=${idProyecto}`,
                    { method: 'GET', credentials: 'include' }
                );
                const data = await res.json();
                if (res.ok && data.length > 0) {
                    setProyecto(data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingProyecto(false);
            }
        };
        getDatosProyecto();
    }, [idProyecto]);

    const montoFinal = monto || Number(montoPersonalizado);

    const porcentaje = proyecto?.financiamiento_actual && proyecto?.objetivo
        ? Math.min(Math.round((proyecto.financiamiento_actual / proyecto.objetivo) * 100), 100)
        : 0;

    const handleDonar = async () => {
        if (!montoFinal || montoFinal < 10) {
            alert('El monto mínimo es $10 MXN');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3001/api/donacion/donar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ monto: montoFinal, nombre }),
                credentials: 'include',
            });
            const data = await res.json();
            window.location.href = data.checkoutUrl;
        } catch (err) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F3EE] py-10 px-4">
            <div className="max-w-5xl mx-auto">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200">

                        {loadingProyecto ? (
                            <div className="h-56 bg-stone-100 animate-pulse" />
                        ) : proyecto?.portada ? (
                            <img
                                src={`http://localhost:3001/uploads/${proyecto.portada}`}
                                alt={proyecto.nombre}
                                className="w-full h-56 object-cover"
                            />
                        ) : (
                            <div className="h-56 bg-stone-100 flex flex-col items-center justify-center gap-2 text-stone-400">
                                <PhotoIcon className="w-10 h-10" />
                                <span className="text-sm">Sin imagen</span>
                            </div>
                        )}

                        <div className="p-6">
                            {proyecto?.categoria && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D5016] bg-[#E8F0D8] px-3 py-1 rounded-full mb-3">
                                    <TagIcon className="w-3.5 h-3.5" />
                                    {proyecto.categoria}
                                </span>
                            )}

                            <h1 className="text-2xl font-bold text-[#1C2B0E] mb-2 leading-tight">
                                {loadingProyecto ? (
                                    <span className="block h-7 bg-stone-100 rounded animate-pulse w-3/4" />
                                ) : (
                                    proyecto?.nombre || 'Proyecto'
                                )}
                            </h1>

                            {proyecto?.ubicacion && (
                                <div className="flex items-center gap-1.5 text-stone-500 text-sm mb-5">
                                    <MapPinIcon className="w-4 h-4 shrink-0" />
                                    <span>{proyecto.ubicacion}</span>
                                </div>
                            )}

                            <div className="mt-2">
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-xs font-semibold text-[#3B6D11]">
                                        {porcentaje}% completado
                                    </span>
                                    <span className="text-xs text-stone-500 flex items-center gap-1">
                                        <CurrencyDollarIcon className="w-3.5 h-3.5" />
                                        Meta: ${proyecto?.objetivo?.toLocaleString('es-MX') ?? '—'} MXN
                                    </span>
                                </div>
                                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#3B6D11] rounded-full transition-all duration-700"
                                        style={{ width: `${porcentaje}%` }}
                                    />
                                </div>
                                {proyecto?.financiamiento_actual != null && (
                                    <p className="text-xs text-stone-400 mt-1.5">
                                        ${proyecto.financiamiento_actual.toLocaleString('es-MX')} MXN recaudados
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col gap-5">

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#E8F0D8] flex items-center justify-center shrink-0">
                                <HeartSolid className="w-5 h-5 text-[#3B6D11]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#1C2B0E] leading-tight">Hacer una donación</h2>
                                <p className="text-sm text-stone-500">Tu apoyo hace la diferencia</p>
                            </div>
                        </div>

                        <hr className="border-stone-100" />

                        <div>
                            <label className="block text-sm font-semibold text-[#1C2B0E] mb-1.5">
                                Tu nombre <span className="font-normal text-stone-400">(opcional)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Anónimo"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11] transition"
                            />
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-[#1C2B0E] mb-2">Elige un monto</p>
                            <div className="grid grid-cols-4 gap-2">
                                {MONTOS_SUGERIDOS.map(m => (
                                    <button
                                        key={m}
                                        onClick={() => { setMonto(m); setMontoPersonalizado(''); }}
                                        className={`py-2.5 rounded-xl text-sm font-semibold border transition-all
                                            ${monto === m
                                                ? 'bg-[#3B6D11] text-white border-[#3B6D11] shadow-sm'
                                                : 'bg-white text-stone-600 border-stone-200 hover:border-[#3B6D11] hover:text-[#3B6D11]'
                                            }`}
                                    >
                                        ${m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-[#1C2B0E] mb-1.5">
                                O escribe otro monto (MXN)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm font-medium">$</span>
                                <input
                                    type="number"
                                    placeholder="350"
                                    value={montoPersonalizado}
                                    onChange={e => { setMontoPersonalizado(e.target.value); setMonto(null); }}
                                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#3B6D11]/30 focus:border-[#3B6D11] transition"
                                />
                            </div>
                        </div>

                        {montoFinal > 0 && (
                            <div className="flex items-center gap-3 bg-[#F0F5E8] border border-[#C0DD97] rounded-xl px-4 py-3">
                                <CheckCircleIcon className="w-5 h-5 text-[#3B6D11] shrink-0" />
                                <p className="text-sm text-[#2D5016]">
                                    Vas a donar{' '}
                                    <span className="font-bold">${montoFinal.toLocaleString('es-MX')} MXN</span>
                                    {nombre && (
                                        <> como <span className="font-bold">{nombre}</span></>
                                    )}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleDonar}
                            disabled={loading || !montoFinal}
                            className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all
                                ${loading || !montoFinal
                                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                    : 'bg-[#2D5016] text-white hover:bg-[#3B6D11] active:scale-[0.98] shadow-sm'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                    </svg>
                                    Redirigiendo...
                                </>
                            ) : (
                                <>
                                    <HeartIcon className="w-4 h-4" />
                                    Donar con Mercado Pago
                                    <ArrowRightIcon className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-stone-400">
                            Pago seguro procesado por Mercado Pago
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}