import React from 'react';
import { Mail, Twitter, Github, Instagram } from 'lucide-react';
import { SOCIALS } from '../constants';

export function About() {
  return (
    <section id="about" className="py-24 px-6 bg-retro-beige">
      <div className="max-w-4xl mx-auto">
        <div className="retro-card p-12 bg-white flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 retro-border flex-shrink-0 bg-retro-yellow overflow-hidden">
             {/* Placeholder for creator avatar */}
             <div className="w-full h-full flex items-center justify-center font-display font-black text-6xl">
                VKR
             </div>
          </div>
          <div>
            <h2 className="text-4xl font-display font-black mb-6 uppercase">The Architect</h2>
            <p className="text-xl mb-6 opacity-80 leading-relaxed">
              Utility District was founded by <span className="font-bold">Vilas K R</span> with a simple mission: create tools that work well and look like they belong in our digital history.
            </p>
            <p className="text-lg mb-8 opacity-70">
              Every app in this district is built independently, with a focus on privacy, utility, and modern-retro aesthetics.
            </p>
            <div className="flex gap-4">
              <SocialBtn icon={<Twitter size={20} />} href={SOCIALS.twitter} label="Twitter" />
              <SocialBtn icon={<Github size={20} />} href={SOCIALS.github} label="Github" />
              <SocialBtn icon={<Instagram size={20} />} href={SOCIALS.instagram} label="Instagram" />
              <SocialBtn icon={<Mail size={20} />} href={SOCIALS.email} label="Email" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialBtn({ icon, href, label }: { icon: React.ReactNode, href?: string, label: string }) {
  return (
    <a 
      href={href || undefined}
      onClick={(e) => {
        if (!href || href === '#') e.preventDefault();
      }}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 retro-border flex items-center justify-center bg-white hover:bg-retro-black hover:text-white transition-all transform hover:-rotate-6"
    >
      {icon}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="py-12 px-6 bg-retro-black text-retro-beige border-t-8 border-retro-yellow">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-retro-beige rounded flex items-center justify-center">
              <span className="text-retro-black font-display font-bold text-2xl">U</span>
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter">UTILITY DISTRICT</span>
          </div>
          
          <div className="flex gap-8 font-bold text-sm tracking-widest uppercase mb-4 md:mb-0">
            <a href={SOCIALS.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-retro-yellow transition-colors">Twitter</a>
            <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" className="hover:text-retro-yellow transition-colors">Github</a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-retro-yellow transition-colors">Instagram</a>
          </div>
        </div>
        
        {/* Retro Pixel Divider */}
        <div className="w-full h-1 bg-[repeating-linear-gradient(90deg,#FDE047_0,#FDE047_4px,transparent_4px,transparent_8px)] mb-8"></div>
        
        <div className="text-center text-xs opacity-60 flex flex-col gap-2">
          <p>© 2026 UTILITY DISTRICT. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH CHAOS BY VILAS K R</p>
        </div>
      </div>
    </footer>
  );
}
