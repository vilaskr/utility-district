import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { APPS } from '../constants';
import SEO from '../components/SEO';

export default function CreativeApps() {
  const creativeApps = APPS.filter(app => app.category === 'CREATIVE');

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <SEO 
        title="Creativity Sandbox" 
        description="Explore highly creative digital tools, interactive audio-visual engines, and custom physics experiments built for fun and expression."
        keywords="creative apps, physics engine, audio visualizer, digital sandbox, interactive art"
      />
      
      {/* Page Header */}
      <section className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-retro-purple text-white border-4 border-retro-black px-4 py-1 rounded-full mb-6 shadow-[4px_4px_0_0_rgba(17,17,17,1)] font-bold text-xs uppercase"
        >
          <Icons.Sparkles size={16} className="text-retro-yellow" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">Creativity Sandbox</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase leading-none">
          Creative <span className="text-white [text-shadow:4px_4px_0_#111,-1.5px_-1.5px_0_#111,1.5px_-1.5px_0_#111,-1.5px_1.5px_0_#111,1.5px_1.5px_0_#111] inline-block">District</span>
        </h1>
        <p className="text-xl text-neutral-800 max-w-2xl mx-auto font-medium">
          A dedicated experimental zone for interactive audio-visual experiences, gravity engines, and generative physics simulations.
        </p>
      </section>

      {/* Grid container */}
      <div className="relative py-12 px-6 bg-white border-4 border-retro-black rounded-none shadow-[8px_8px_0_0_rgba(17,17,17,1)] mb-16">
        <div className="absolute inset-0 bg-[radial-gradient(#eee_1px,transparent_0)] [background-size:24px_24px] pointer-events-none opacity-50"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-display font-bold uppercase">Sandbox Directory</h2>
              <p className="text-md opacity-70">Interactive canvases and generative media generators.</p>
            </div>
            <div className="retro-border bg-retro-purple text-white px-6 py-3 font-bold uppercase tracking-tight shadow-[4px_4px_0_0_rgba(17,17,17,1)] rounded-xl flex items-center gap-2">
              <Icons.Layers size={18} />
              <span>EXPERIMENTAL LABS: {creativeApps.length}</span>
            </div>
          </div>

          {creativeApps.length === 0 ? (
            <div className="retro-card bg-retro-beige p-16 text-center border-dashed border-4 border-retro-black/40">
              <Icons.Atom className="mx-auto mb-4 text-neutral-400 animate-spin" size={48} />
              <h3 className="text-xl font-bold uppercase mb-2">No Creative Apps Found</h3>
              <p className="text-neutral-500 max-w-md mx-auto">
                No apps are currently categorized under CREATIVE. Check back later as we ship new generative physics simulations.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {creativeApps.map((app, index) => (
                <CreativeAppCard key={app.id} app={app} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sandbox Stats / Footer Notes */}
      <div className="border-t-4 border-retro-black pt-12 flex flex-wrap justify-center gap-12">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">RENDER MODE</span>
          <span className="text-2xl font-black font-display text-retro-green tracking-tighter">GPU STABLE</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">PARTICLE CAP</span>
          <span className="text-2xl font-black font-display text-retro-blue tracking-tighter">UNLIMITED</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">LAB VERSION</span>
          <span className="text-2xl font-black font-display text-retro-black tracking-tighter">v1.0-BETA</span>
        </div>
      </div>
    </div>
  );
}

function CreativeAppCard({ app, index }: { app: any; index: number; key?: string }) {
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
            {app.stickers?.map((sticker: string) => (
              <span key={sticker} className="bg-white border-2 border-retro-black px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter">
                {sticker}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="text-[10px] font-bold text-retro-black/40 uppercase tracking-[0.2em]">{app.category}</span>
          <h3 className="text-3xl font-display font-black uppercase mt-1 text-retro-black">{app.name}</h3>
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
          ENTER SANDBOX
          <Icons.ExternalLink size={18} />
        </a>
      </div>
    </motion.div>
  );
}
