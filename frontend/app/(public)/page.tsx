import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/ui/Footer/Footer'; 

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <Hero />
        <Features />
        <CallToAction />
        <Footer />
        </main>
    );
}