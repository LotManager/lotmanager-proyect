import { PiCowDuotone } from "react-icons/pi";
import { MdHistory, MdFoodBank, MdAnalytics } from "react-icons/md";
import { GiWeight } from "react-icons/gi";
import { FaChartPie } from "react-icons/fa";

const features = [
    {
        icon: PiCowDuotone,
        title: "Gestión por Corrales",
        desc: "Monitoreo en tiempo real del estado, cantidad y evolución de cada grupo animal.",
        color: "text-green-600",
        bg: "bg-green-50"
    },
    {
        icon: MdHistory,
        title: "Historial Clínico",
        desc: "Registro detallado de tratamientos, vacunaciones y enfermedades por animal.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: MdFoodBank,
        title: "Control de Dietas",
        desc: "Ajusta y verifica los suministros nutricionales para maximizar el rendimiento.",
        color: "text-orange-600",
        bg: "bg-orange-50"
    },
    {
        icon: GiWeight,
        title: "Evolución de Peso",
        desc: "Registra pesajes y visualiza la ganancia media diaria (GMD) con gráficos claros.",
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        icon: FaChartPie,
        title: "Reportes Inteligentes",
        desc: "Toma decisiones basadas en datos con estadísticas de eficiencia productiva.",
        color: "text-rose-600",
        bg: "bg-rose-50"
    },
    {
        icon: MdAnalytics,
        title: "Trazabilidad Total",
        desc: "Sigue el recorrido completo del animal desde el ingreso hasta la salida.",
        color: "text-teal-600",
        bg: "bg-teal-50"
    }
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                        Todo lo que necesitas en un solo lugar
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Herramientas potentes simplificadas para el trabajo diario en el campo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="group p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className={`w-14 h-14 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <f.icon size={28} className={f.color} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">{f.title}</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}