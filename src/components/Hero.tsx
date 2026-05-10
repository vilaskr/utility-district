import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-6 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8"
        >
          <div className="border-4 border-retro-black bg-retro-yellow px-3 py-1 flex items-center gap-2 rounded-lg shadow-[4px_4px_0_0_rgba(17,17,17,1)]">
            <span className="w-2 h-2 bg-retro-green rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-retro-black">ONLINE</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl font-display font-black leading-none mb-6">
            DAILY TOOLS FOR<br />
            <span className="text-retro-blue relative">
              MODERN CHAOS
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-retro-blue/20 -z-10 mt-1"></div>
            </span>
          </h1>
          
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-20 h-20 bg-[radial-gradient(#111_2px,transparent_0)] [background-size:10px_10px] opacity-20 hidden lg:block"></div>
          <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-[radial-gradient(#111_2px,transparent_0)] [background-size:10px_10px] opacity-20 hidden lg:block"></div>
        </motion.div>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-medium max-w-2xl mb-12 opacity-80"
        >
          A collection of retro-styled internet utilities built independently by <span className="underline decoration-4 decoration-retro-yellow underline-offset-4 font-bold">Vilas K R</span>. 
          Useful apps, zero fluff.
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="retro-button bg-retro-black text-white text-lg px-12"
          onClick={() => document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Tools
        </motion.button>
      </div>
    </section>
  );
}
