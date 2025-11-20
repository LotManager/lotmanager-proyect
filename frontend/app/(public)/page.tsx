import Navbar from '../../src/components/landing/Navbar';
import Hero from '../../src/components/landing/Hero';
import Features from '../../src/components/landing/Features';
import CallToAction from '../../src/components/landing/CallToAction';
import Footer from '../../src/components/ui/Footer/Footer'; 

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