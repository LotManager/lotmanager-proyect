import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Fondo con Imagen y Overlay */}
            <div className="absolute inset-0 z-0">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/bg_lotm_home.jpg')" }}
                />
                {/* Gradiente negro para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-secondary/90" />
            </div>

            {/* Contenido Principal */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                    El futuro de tu campo <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-500">
                        comienza aquí
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Optimiza la producción, controla la sanidad y gestiona tus lotes con la plataforma integral diseñada para productores modernos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        href="/registro?mode=register" 
                        className="px-8 py-4 bg-primary hover:bg-green-600 text-white font-bold rounded-full transition-all shadow-xl shadow-green-900/40 hover:-translate-y-1"
                    >
                        Comenzar
                    </Link>
                    <a 
                        href="#features" 
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
                    >
                        Ver Características
                    </a>
                </div>
            </div>
        </section>
    );
}