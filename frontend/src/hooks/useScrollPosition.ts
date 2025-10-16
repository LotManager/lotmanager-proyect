"use client"; 

import { useState, useEffect } from 'react';

// Hook personalizado para obtener la posición vertical del scroll
export const useScrollPosition = (offset = 0) => {
    // 1. Estado para almacenar si ya se superó la posición de scroll
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // 2. Comprobamos si la posición actual del scroll (window.scrollY) es mayor que el offset deseado.
            // Aseguramos que window exista, aunque "use client" ya lo garantiza.
            if (typeof window !== 'undefined' && window.scrollY > offset) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // 3. Agregamos el listener al objeto window
        window.addEventListener('scroll', handleScroll);

        // 4. Limpieza: Removemos el listener al desmontar el componente
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [offset]); // El offset es una dependencia

    return isScrolled;
};