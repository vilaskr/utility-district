import Hero from '../components/Hero';
import AppGrid from '../components/AppGrid';
import { About } from '../components/AboutAndFooter';
import SEO from '../components/SEO';

export default function HomePage() {
  return (
    <>
      <SEO 
        title="Home" 
        description="A polished retro-styled utility hub for indie tools. Discover minimalist digital tools for modern productivity."
        keywords="utility hub, indie tools, retro software, productivity tools, minimalist tech"
      />
      <Hero />
      <AppGrid />
      <About />
    </>
  );
}
