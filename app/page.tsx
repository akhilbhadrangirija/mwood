import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Equipment from './components/Equipment';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      <Hero />
      <Services />
      <About />
      <Equipment />
      <Clients />
      <Contact />
      
      <Footer />
    </main>
  );
}