import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import Link from 'next/link';
import * as React from 'react';

export default function FooterHome() {
    return (
        // Usamos un fondo oscuro (ej: secondary o negro/gris oscuro) y texto blanco
        <footer className="bg-[var(--color-secondary)] text-white p-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-gray-600 pb-8">
                
                {/* Columna 1: Marca y Redes Sociales */}
                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-extrabold tracking-widest">LOTMANAGER</h1> 
                    <p className="text-gray-300 max-w-md">
                        Plataforma líder en gestión de ganado para administradores y operadores de feedlots modernos.
                    </p>
                    
                    {/* Iconos de Redes Sociales */}
                    <div className="flex gap-4 text-2xl mt-4">
                        <Link href="#" passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200"><FaInstagram /></a>
                        </Link>
                        <Link href="#" passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200"><FaTwitter /></a>
                        </Link>
                        <Link href="#" passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200"><FaLinkedin /></a>
                        </Link>
                        <Link href="https://github.com/REPOSITORIO_LOTMANAGER" passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200"><FaGithub /></a>
                        </Link>
                        <Link href="#" passHref legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors duration-200"><FaTiktok /></a>
                        </Link>
                    </div>
                </div>

                {/* Columna 2: Información de Contacto (Dirección/Teléfono) */}
                <div>
                    <h3 className="text-2xl font-bold mb-4">Contáctanos</h3>
                    <div className="space-y-3 text-gray-300">
                        <p>2125 Transformación Drive</p>
                        <p>Departemento 1000</p>
                        <p>Buenos Aires, NE 68508</p>
                        <p className="mt-4">(+54) 221-589082</p>
                        <p className="flex items-center gap-2">
                            <FaEnvelope className="text-[var(--color-primary)]" />
                            <a href="mailto:support@lotmanager.com" className="hover:text-[var(--color-primary)]">support@lotmanager.com</a>
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} LotManager | Todos los derechos reservados.
            </div>
        </footer>
    );
}