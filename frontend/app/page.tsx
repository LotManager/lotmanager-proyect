import Navbar from '@/src/components/landing/Navbar';
import Hero from '@/src/components/landing/Hero';
import Features from '@/src/components/landing/Features';
import CallToAction from '@/src/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* 1. Barra de Navegación Superior */}
      <Navbar />

      {/* 2. Sección Principal (Banner con Imagen) */}
      <Hero />

      {/* 3. Grilla de Características (Bento Grid) */}
      <Features />

      {/* 4. Llamada a la Acción (Crear Cuenta Admin) */}
      <CallToAction />

    </main>
  );
}