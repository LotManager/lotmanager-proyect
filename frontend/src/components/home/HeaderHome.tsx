"use client"; 

import Button from '@mui/material/Button';
import * as React from 'react';
// Importamos el hook que acabamos de crear (asegúrate de que la ruta sea correcta)
import { useScrollPosition } from '@/hooks/useScrollPosition'; 

// Definimos el punto de scroll donde queremos que cambie, por ejemplo, 100px.
const SCROLL_CHANGE_POINT = 10;

export default function HeaderHome() {
    // Usamos el hook. isScrolled será true si el scroll > 100
    const isScrolled = useScrollPosition(SCROLL_CHANGE_POINT);

    // Definimos las clases que cambian
    const headerClasses = `
        z-20 flex flex-row items-center justify-between p-4 sm:px-8 transition-all duration-300 ease-in-out 
        
        ${isScrolled 
            ? 'fixed top-0 left-0 right-0 bg-[var(--color-tertiary)] shadow-lg' // Estado Fijo (Scrolled)
            : 'absolute top-0 left-0 right-0 bg-transparent' // Estado Inicial (Transparente)
        }
    `;
    
    // Cambiamos el color del texto y logo en función del scroll
    const logoTextColor = isScrolled ? 'text-[var(--color-secondary)]' : 'text-white';
    const buttonVariant = isScrolled ? 'contained' : 'outlined'; // Botones con relleno al fijarse

    return (
        // Usamos las clases dinámicas
        <header className={headerClasses}>
            <div className="flex items-center gap-4">
                {/* Ajuste al logo: si es scrolled, el fondo blanco es menos necesario */}
                <img 
                    src="images/logo_lotm.png" 
                    alt="LotManager Logo" 
                    className={`h-20 w-auto p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'bg-transparent' : 'bg-white/70'}`}
                />
                <h1 className={`font-bold text-lg text-shadow transition-colors duration-300 ${logoTextColor}`}>
                    LotManager
                </h1>
            </div>
            <div className="flex justify-between gap-4">
                {/* Botón de Iniciar Sesión */}
                <Button 
                    variant={buttonVariant as "contained" | "outlined"}
                    sx={{
                        borderColor: isScrolled ? 'var(--color-primary)' : 'white',
                        color: isScrolled ? 'white' : 'white',
                        bgcolor: isScrolled ? 'var(--color-primary)' : 'transparent',
                        '&:hover': {
                            backgroundColor: isScrolled ? 'var(--color-secondary)' : 'white',
                            color: isScrolled ? 'white' : 'var(--color-secondary)',
                            borderColor: isScrolled ? 'var(--color-secondary)' : 'white'
                        },
                    }}
                >
                    Iniciar Sesion
                </Button>
                
                {/* Botón de Registrarse */}
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
                    Registrarse
                </Button>
            </div>
        </header>
    );
}