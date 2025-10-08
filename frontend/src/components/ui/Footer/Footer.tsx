import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-[var(--color-secondary)] text-white py-6">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="text-left mb-4 md:mb-0">
                    <h3 className="font-semibold">Contacto</h3>
                    <p className="text-sm">Tel: +54 123456789</p>
                    <p className="text-sm">Correo: soporte@lotmanager.com</p>
                </div>

                <div className="text-right">
                    <h3 className="font-semibold">Redes Sociales</h3>
                    <div className="flex items-center justify-end gap-4 mt-2">
                        <a href="#" aria-label="Instagram" className="hover:opacity-80">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" aria-label="X" className="hover:opacity-80">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:opacity-80">
                            <FaYoutube size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
