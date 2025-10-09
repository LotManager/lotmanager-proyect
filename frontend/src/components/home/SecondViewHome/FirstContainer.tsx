import { Button, Link } from "@mui/material";

export default function FirstContainer() {
    return (
        <>
            <div className="h-full flex flex-col items-center justify-center p-8">
                <h1 className="xl:text-2xl text-[var(--color-secondary)] font-bold">¿Ya sos parte de LotManager?</h1>
                <h2 className="lg:text-lg text-[var(--color-secondary)] font-bold">Ingresá como administrador o encargado para comenzar a gestionar.</h2>
                <div className="flex flex-row gap-4 mt-4">
                    <Link href="/login?role=admin">
                    <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                    }}>
                    Ingresar como Administrador
                    </Button>
                    </Link>
                    <Link href="/login?role=user">
                    <Button
                    variant="contained"
                    sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                    }}>
                    Ingresar como Encargado
                    </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}