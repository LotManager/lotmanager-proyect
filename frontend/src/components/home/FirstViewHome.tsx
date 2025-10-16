export default function FirstViewHome() {
    return (
        <div className="relative flex flex-col px-10 md:px-20 justify-end h-[85vh] bg-[url('/images/bg_lotm_home.jpg')] bg-cover bg-center pt-24 pb-20">
            
            {/* Overlay de Gradiente Oscuro */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <div className="relative z-10">
                <h2 className="text-6xl font-extrabold text-white text-shadow-lg leading-tight">
                    Bienvenido a LotManager
                </h2>
                <p className="mt-4 text-xl text-gray-200">
                    La solución integral para la gestión de lotes.
                </p>
            </div>
        </div>
    );
}
