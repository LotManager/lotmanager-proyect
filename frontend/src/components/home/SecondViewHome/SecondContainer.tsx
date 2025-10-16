import { PiCowDuotone } from "react-icons/pi";
import { MdHistory, MdFoodBank } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { FaChartBar } from "react-icons/fa";

// Clase de utilidad para el círculo exterior del ícono
const iconCircleClasses = "w-20 h-20 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-md mb-4";

// Clase de utilidad para las tarjetas de característica (más limpias y centradas)
const featureCardClasses = "flex flex-col items-center text-center p-4 h-full transition-all duration-300 hover:scale-[1.02] cursor-default";

export default function SecondContainer() {
    return (
        <>
            {/* Primera sección de 3 columnas */}
            {/* Quitamos el fondo terciario de la sección para dejar que se vea el fondo general si lo hubiera, o el blanco/claro del contenedor padre */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 justify-items-stretch items-start">
                
                {/* 1. Seguimiento por Corral */}
                <div className={featureCardClasses}>
                    <div className={iconCircleClasses}>
                        <PiCowDuotone size={36} className="text-[var(--color-secondary)]"/>
                    </div>
                    <h1 className="lg:text-xl font-bold text-[var(--color-secondary)] mb-2">Seguimiento por Corral</h1>
                    <p className="text-gray-600">
                        El sistema facilita el seguimiento individual y grupal de los animales,
                        visualizando información en tiempo real sobre su estado, cantidad y evolución.
                    </p>
                </div>
                
                {/* 2. Historial de Animales */}
                <div className={featureCardClasses}>
                    <div className={iconCircleClasses}>
                        <MdHistory size={36} className="text-[var(--color-secondary)]"/>
                    </div>
                    <h1 className="lg:text-xl font-bold text-[var(--color-secondary)] mb-2">Historial de Animales</h1>
                    <p className="text-gray-600">
                        Muestra un historial completo de cada animal, incluyendo datos de peso, 
                        tratamientos, enfermedades, movimientos y alimentación.
                    </p>
                </div>
                
                {/* 3. Control de Dietas y Alimentos */}
                <div className={featureCardClasses}> 
                    <div className={iconCircleClasses}>
                        <MdFoodBank size={36} className="text-[var(--color-secondary)]" />
                    </div>
                    <h1 className="lg:text-xl font-bold text-[var(--color-secondary)] mb-2">Control de Dietas y Alimentos</h1>
                    <p className="text-gray-600">
                        Permite un control integrado de las dietas y alimentos administrados, 
                        asegurando que los suministros se ajusten a las necesidades nutricionales.
                    </p>
                </div>
            </section>

            {/* Segunda sección de 2 columnas (Ajustamos para que se vea bien centrado) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 max-w-4xl mx-auto">
                
                {/* 4. Registro de Peso */}
                <div className={featureCardClasses}> 
                    <div className={iconCircleClasses}>
                        <GiWeight size={36} className="text-[var(--color-secondary)]" />
                    </div>
                    <h1 className="lg:text-xl font-bold text-[var(--color-secondary)] mb-2">Registro de Peso</h1>
                    <p className="text-gray-600">
                        El sistema ofrece la funcionalidad para registrar el peso de cada animal de forma periódica, 
                        permitiendo analizar su evolución y rendimiento a lo largo del tiempo.
                    </p>
                </div>
                
                {/* 5. Estadísticas Generales */}
                <div className={featureCardClasses}>
                    <div className={iconCircleClasses}>
                        <FaChartBar size={36} className="text-[var(--color-secondary)]" /> 
                    </div>
                    <h1 className="lg:text-xl font-bold text-[var(--color-secondary)] mb-2">Estadísticas Generales</h1>
                    <p className="text-gray-600">
                        Genera reportes automáticos de eficiencia productiva, 
                        mostrando indicadores como ganancia de peso, consumo de alimento y rendimiento por corral.
                    </p>
                </div>
            </section>
        </>
    );
}