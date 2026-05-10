import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppGrid from './components/AppGrid';
import { About, Footer } from './components/AboutAndFooter';
import RetroLoader from './components/RetroLoader';
import { Monitor, MousePointer2 } from 'lucide-react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [customCursor, setCustomCursor] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCustomCursor({ x: e.clientX, y: e.clientY });
      if (!cursorVisible) setCursorVisible(true);
    };

    const handleMouseEnter = () => setCursorVisible(true);
    const handleMouseLeave = () => setCursorVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorVisible]);

  return (
    <div className="relative min-h-screen cursor-none">
      <AnimatePresence>
        {loading && (
          <RetroLoader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Retro Global Cursor */}
      <div 
        className={`fixed pointer-events-none z-[9999] text-retro-black drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] transition-opacity duration-150 ${cursorVisible ? 'opacity-100' : 'opacity-0'} hidden md:block`}
        style={{ 
          left: `${customCursor.x}px`, 
          top: `${customCursor.y}px`,
          transform: 'translate(-2px, -2px)'
        }}
      >
        <MousePointer2 size={18} fill="currentColor" />
      </div>

      <div className="bg-[#FDFCF0] selection:bg-retro-black selection:text-retro-beige">
        <Navbar />
        
        <main>
          <Hero />
          <AppGrid />
          <About />
        </main>

        <Footer />

        {/* Floating Controls */}
        <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
          <button 
            onClick={() => setCrtEnabled(!crtEnabled)}
            className={`w-12 h-12 retro-border flex items-center justify-center transition-all bg-white hover:rotate-12 ${crtEnabled ? 'bg-retro-green text-retro-black' : 'opacity-50'}`}
            title="Toggle CRT Overlay"
          >
            <Monitor size={20} />
          </button>
        </div>

        {/* Decorative Floating Stickers */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
           <Sticker text="100% INDIE" top="20%" left="5%" rotate="-12deg" color="bg-retro-yellow" />
           <Sticker text="EST 2026" top="75%" left="2%" rotate="15deg" color="bg-retro-blue" textLight />
           <Sticker text="VILAS K R" top="15%" right="3%" rotate="8deg" color="bg-retro-red" textLight />
           <Sticker text="RETRO TECH" top="85%" right="8%" rotate="-5deg" color="bg-retro-green" />
        </div>

        {/* CRT Overlay Effects */}
        {crtEnabled && (
          <>
            <div className="crt-overlay" />
            <div className="scanline" />
          </>
        )}
      </div>
    </div>
  );
}

function Sticker({ text, top, left, right, rotate, color, textLight }: { 
  text: string, top?: string, left?: string, right?: string, rotate: string, color: string, textLight?: boolean 
}) {
  return (
    <motion.div 
      initial={{ scale: 0, rotate: 0 }}
      animate={{ scale: 1, rotate }}
      transition={{ delay: 1, type: 'spring' }}
      className={`absolute px-4 py-1 retro-border ${color} ${textLight ? 'text-white' : 'text-retro-black'} font-black text-xs tracking-tighter shadow-[4px_4px_0_0_rgba(17,17,17,0.4)] whitespace-nowrap hidden lg:block`}
      style={{ top, left, right }}
    >
      {text}
    </motion.div>
  );
}
