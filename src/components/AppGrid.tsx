import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { APPS, AppUtility } from '../constants';

export default function AppGrid() {
  return (
    <section id="apps" className="py-24 px-6 bg-white border-y-4 border-retro-black relative">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#eee_1px,transparent_0)] [background-size:24px_24px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 uppercase">District Directory</h2>
            <p className="text-xl opacity-70">Browse the latest utility drops from the ecosystem.</p>
          </div>
          <div className="retro-card bg-retro-beige px-6 py-3 font-bold">
            TOTAL APPS: {APPS.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {APPS.map((app, index) => (
            <AppCard key={app.id} app={app} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AppCard({ app, index }: { app: AppUtility; index: number; key?: string }) {
  // Dynamically get the icon component
  const IconComponent = (Icons as any)[app.icon] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="retro-card group hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_rgba(17,17,17,1)] flex flex-col h-full overflow-hidden"
    >
      <div className={`h-4 border-b-4 border-retro-black ${app.color}`}></div>
      
      <div className="p-8 flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div className="w-16 h-16 retro-border flex items-center justify-center bg-white">
            <IconComponent size={32} />
          </div>
          <div className="flex flex-wrap gap-2 justify-end">
            {app.stickers?.map(sticker => (
              <span key={sticker} className="bg-white border-2 border-retro-black px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter">
                {sticker}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="text-[10px] font-bold text-retro-black/40 uppercase tracking-[0.2em]">{app.category}</span>
          <h3 className="text-3xl font-display font-black uppercase mt-1">{app.name}</h3>
          <p className="text-retro-blue font-bold text-sm mt-1">{app.tagline}</p>
        </div>

        <p className="text-gray-600 leading-relaxed mb-8">
          {app.description}
        </p>
      </div>

      <div className="p-8 pt-0 mt-auto">
        <a 
          href={app.url} 
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button w-full"
        >
          OPEN APP
          <Icons.ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
}
