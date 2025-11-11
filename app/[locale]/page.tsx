import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Clients from '@/app/components/Clients';
import Equipment from '@/app/components/Equipment';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const tClients = await getTranslations('Clients');
  const subheading = tClients('strapline');
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <Clients marquee compact subheading={subheading} />
  <Services />
      <About />
      <Equipment variant="tabs" />
      <Contact />
      <Footer />
    </main>
  );
}

export function generateStaticParams() {
  return ['en', 'ar'].map((locale) => ({ locale }));
}
