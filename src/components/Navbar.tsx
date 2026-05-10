import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Info, Github, Home, Users } from 'lucide-react';
import { SOCIALS } from '../constants';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="retro-card bg-white px-6 py-4 flex items-center justify-between shadow-[8px_8px_0_0_rgba(17,17,17,1)]"
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-retro-black rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="text-white font-display font-bold text-lg">U</span>
          </div>
          <span className="font-display font-bold text-xl hidden sm:block tracking-tight">UTILITY DISTRICT</span>
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <NavLink icon={<Home size={18} />} label="Home" href="/" active={location.pathname === '/'} />
          <NavLink icon={<Users size={18} />} label="Community" href="/community" active={location.pathname === '/community'} />
          <NavLink icon={<LayoutGrid size={18} />} label="Apps" href="/#apps" active={location.hash === '#apps'} />
          <NavLink icon={<Info size={18} />} label="About" href="/#about" active={location.hash === '#about'} />
          <a 
            href={SOCIALS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Github Profile"
            className="w-10 h-10 retro-border flex items-center justify-center bg-white hover:bg-retro-black hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </motion.div>
    </nav>
  );
}

function NavLink({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  const isHash = href.startsWith('/#');
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHash && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${id}`);
      }
    }
  };
  
  if (isHash) {
    return (
      <a 
        href={href} 
        onClick={handleScroll}
        className={`flex items-center gap-2 font-bold transition-colors group ${active ? 'text-retro-blue' : 'hover:text-retro-blue'}`}
      >
        <span className="group-hover:translate-y-[-2px] transition-transform">{icon}</span>
        <span className="hidden lg:block uppercase text-[10px] font-black tracking-widest">{label}</span>
      </a>
    );
  }

  return (
    <Link 
      to={href} 
      className={`flex items-center gap-2 font-bold transition-colors group ${active ? 'text-retro-blue' : 'hover:text-retro-blue'}`}
    >
      <span className="group-hover:translate-y-[-2px] transition-transform">{icon}</span>
      <span className="hidden lg:block uppercase text-[10px] font-black tracking-widest">{label}</span>
    </Link>
  );
}
