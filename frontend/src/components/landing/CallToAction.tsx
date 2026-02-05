import Link from 'next/link';
import { FaRocket, FaUsers } from 'react-icons/fa';

export default function CallToAction() {
    return (
        <section className="py-24 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    Toma el control total de tu producción
                </h2>
                
                <p className="text-green-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    Regístrate como administrador, da de alta a tus empleados y centraliza toda la información de tus corrales en una sola plataforma.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    
                    {/* Botón Registro */}
                    <Link 
                        // CAMBIO AQUÍ
                        href="/registro?mode=register" 
                        className="group flex items-center gap-3 bg-white text-secondary px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-xl hover:shadow-white/20 transform hover:-translate-y-1"
                    >
                        <FaRocket className="text-green-600 group-hover:animate-pulse" />
                        Crear Cuenta de Administrador
                    </Link>

                    {/* Botón Login */}
                    <Link 
                        // CAMBIO AQUÍ
                        href="/registro?mode=login" 
                        className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white border border-white/30 hover:bg-white/10 transition-all"
                    >
                        <FaUsers />
                        Ya tengo cuenta
                    </Link>
                </div>
                
                <p className="mt-6 text-sm text-green-200/60">
                    * No requiere tarjeta de crédito para empezar.
                </p>
            </div>
        </section>
    );
}