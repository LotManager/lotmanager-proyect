import { Button } from "@mui/material";

export default function FirstContainer() {
    return (
        // Aplicamos un color de fondo claro (o el terciario) y un padding vertical generoso
        <div className="bg-gray-100 flex flex-col items-center justify-center p-12">
            <h1 className="xl:text-3xl text-[var(--color-secondary)] font-extrabold">¿Ya sos parte de LotManager?</h1>
            <h2 className="lg:text-xl text-[var(--color-secondary)] mt-2 mb-6">Ingresá como administrador o encargado para comenzar a gestionar.</h2>
            
            <div className="flex flex-row gap-4">
                {/* Botón Administrador */}
                <Button
                    variant="contained"
                    sx={{
                        // Mantengo la paleta, pero ajusto el estilo del botón para que se vea como en la imagen que enviaste (color más suave, menos saturado)
                        bgcolor: 'var(--color-primary)', // Usando el color definido
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                        padding: '10px 20px',
                        textTransform: 'none' // Para que el texto sea más legible
                    }}
                >
                    Ingresar como Administrador
                </Button>
                
                {/* Botón Encargado */}
                <Button
                    variant="contained"
                    sx={{
                        // Mismas propiedades para consistencia
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                        padding: '10px 20px',
                        textTransform: 'none'
                    }}
                >
                    Ingresar como Encargado
                </Button>
            </div>
        </div>
    );
}