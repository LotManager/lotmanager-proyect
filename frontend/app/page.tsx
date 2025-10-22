"use client"; // Necesitamos marcar esta página como Cliente para usar useState.

import React, { useState } from "react";
import HeaderHome from "@/components/home/HeaderHome";
import FirstViewHome from "@/components/home/FirstViewHome";
import SecondViewHome from "@/components/home/SecondViewHome/SecondViewHome";
import FooterHome from '@/components/home/FooterHome';
import AuthModal from "@/components/auth/AuthModal";


interface HeaderHomeProps {
  onAuthButtonClick?: () => void
}
export default function HomePage() {
    // 1. Estado para controlar la visibilidad del modal.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Nuevo estado para saber qué formulario mostrar ('login' por defecto)
    const [authView, setAuthView] = useState<'login' | 'register'>('login');

    // Función que recibe la vista del Header y abre el modal
    const handleOpenModal = (view: 'login' | 'register') => {
        setAuthView(view);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <> 
            {/* 2. Pasamos la función de apertura al HeaderHome */}
            <HeaderHome onAuthButtonClick={handleOpenModal} /> 
            
            <FirstViewHome /> 
            <SecondViewHome />
            
            <FooterHome />

            {/* 3. Renderizamos el AuthModal y le pasamos el estado y la función de cierre */}
            <AuthModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                initialView={authView}
            />
        </>
    );
}