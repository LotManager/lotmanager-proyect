export default function FirstViewHome() {
    return (
        <div className="flex flex-col px-60 justify-center h-screen bg-[url('/images/bg_lotm_home.jpg')] bg-cover bg-center h-screen">
            <h2 className="text-4xl font-bold text-[var(--color-background)] text-shadow">Bienvenido a LotManager</h2>
            <p className="mt-4 text-lg text-[var(--color-background)] text-shadow">
                La solución integral para la gestión de lotes.
            </p>
        </div>
    );
}
