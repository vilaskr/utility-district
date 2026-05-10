import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';

export default function RetroLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-retro-beige flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/p6.png')]">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-lg retro-card p-8 bg-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <Terminal className="text-retro-black" size={32} />
          <h2 className="text-2xl font-display font-bold">BOOTING SYSTEM...</h2>
        </div>
        
        <div className="mb-4 flex justify-between font-mono text-sm">
          <span>UTILITY_DISTRICT_V1.0.4.SYS</span>
          <span>{Math.min(100, progress)}%</span>
        </div>

        <div className="w-full h-10 retro-border bg-gray-100 overflow-hidden relative">
          <motion.div 
            className="h-full bg-retro-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <div className="mt-6 font-mono text-xs space-y-1 opacity-60">
          <p>{`> INITIALIZING CORE KERNEL`}</p>
          <p>{`> LOADING RETRO ASSETS`}</p>
          <p>{`> CALCULATING MODERN CHAOS`}</p>
          <p>{`> CONNECTING TO VILAS_K_R_NETWORK`}</p>
        </div>
      </motion.div>
    </div>
  );
}
