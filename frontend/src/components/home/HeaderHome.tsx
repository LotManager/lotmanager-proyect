import Button from '@mui/material/Button';
import * as React from 'react';

export default function HeaderHome() {
    return (
        <header className="flex flex-row items-center justify-between p-4 sm:px-8 bg-[var(--color-tertiary)]">
            <div className="flex items-center gap-4">
                <img src="images/logo_lotm.png" alt="LotManager Logo" className="h-20 w-auto"/>
                <h1 className='text-[var(--color-secondary)] font-bold'>LotManager</h1>
            </div>
            <div className="flex justify-between gap-4">
                <Button 
                    variant="contained"
                    sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                    }}
                >
                Iniciar Sesion
                </Button>
                <Button 
                    variant="contained"
                    sx={{
                        bgcolor: 'var(--color-primary)',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'var(--color-secondary)',
                            color: 'white'
                        },
                    }}
                    href='/register'
                >
                Registrarse
                </Button>
            </div>
        </header>
    );
}
