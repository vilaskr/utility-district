import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, Info, Github, Home } from 'lucide-react';
import { SOCIALS } from '../constants';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="retro-card bg-white px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-retro-black rounded flex items-center justify-center">
            <span className="text-white font-display font-bold text-lg">U</span>
          </div>
          <span className="font-display font-bold text-xl hidden sm:block tracking-tight">UTILITY DISTRICT</span>
        </div>

        <div className="flex items-center gap-6">
          <NavLink icon={<Home size={18} />} label="Home" href="#" />
          <NavLink icon={<LayoutGrid size={18} />} label="Apps" href="#apps" />
          <NavLink icon={<Info size={18} />} label="About" href="#about" />
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

function NavLink({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) {
  return (
    <a 
      href={href} 
      className="flex items-center gap-2 font-bold hover:text-retro-blue transition-colors group"
    >
      <span className="group-hover:translate-y-[-2px] transition-transform">{icon}</span>
      <span className="hidden md:block uppercase text-xs tracking-widest">{label}</span>
    </a>
  );
}
