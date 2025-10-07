import { PiCowDuotone } from "react-icons/pi";
import { MdHistory } from "react-icons/md";
import { MdFoodBank } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { FcStatistics } from "react-icons/fc";

export default function SecondContainer() {
    return (
        <>
            <section className="grid grid-cols-3 gap-4 p-8 bg-[var(--color-tertiary)] justify-items-center items-center">
                <div className=" text-[var(--color-secondary)] flex flex-col items-center gap-4">
                    <PiCowDuotone size={48}/>
                    <h1 className="lg:text-xl font-bold">Seguimiento por Corral</h1>
                    <p className="text-center">
                    El sistema facilitará el seguimiento individual y grupal de los animales por corral,
                    visualizando información en tiempo real sobre su estado, cantidad y evolución.
                    </p>
                </div>
                <div className=" text-[var(--color-secondary)] flex flex-col items-center gap-4 text-center">
                    <MdHistory size={48}/>
                    <h1 className="lg:text-xl font-bold">Historial de Animales</h1>
                    <p>El sistema mostrará un historial completo de cada animal, incluyendo datos de peso, 
                        tratamientos, enfermedades, movimientos entre corrales y alimentación.
                    </p>
                </div>
                <div className=" text-[var(--color-secondary)] flex flex-col items-center gap-4 text-center"> 
                    <MdFoodBank size={48} className="text-[var(--color-secondary)]" />
                    <h1 className="lg:text-xl font-bold">Control de Dietas y Alimentos</h1>
                    <p className="text-center">
                        Permitirá realizar un control integrado de las dietas y alimentos administrados, 
                        verificando que los suministros se ajusten a las necesidades nutricionales de cada grupo de animales.
                    </p>
                </div>
            </section>
            <section className="grid grid-cols-2 gap-4 p-16 bg-[var(--color-tertiary)] justify-items-center items-center">
                <div className=" text-[var(--color-secondary)] flex flex-col items-center gap-4"> 
                    <GiWeight size={48} className="text-[var(--color-secondary)] text-center" />
                    <h1 className="lg:text-xl font-bold">Registro de Peso</h1>
                    <p className="text-center">
                        El sistema ofrecerá la funcionalidad para registrar el peso de cada animal de forma periódica, 
                        permitiendo analizar su evolución y rendimiento a lo largo del tiempo.
                    </p>
                </div>
                <div className=" text-[var(--color-secondary)] flex flex-col items-center gap-4">
                    <FcStatistics size={48} className="text-[var(--color-secondary)] text-center" />
                    <h1 className="lg:text-xl font-bold">Estadísticas Generales</h1>
                    <p className="text-center">
                        Se podrán generar reportes automáticos de eficiencia productiva, 
                        mostrando indicadores como ganancia de peso, consumo de alimento y rendimiento por corral o grupo.
                    </p>
                </div>
            </section>
        </>
    );
}
