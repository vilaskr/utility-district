import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, getDocs, limit, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CommunityTool } from '../types/community';
import { Search, Plus, Sparkles, Filter, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CommunityHub() {
  const [tools, setTools] = useState<CommunityTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'ALL', 'PRODUCTIVITY', 'CREATOR', 'SHARING', 'FINANCE', 'AI', 'EXPERIMENTAL', 'FUN', 'DEVELOPER', 'STUDY'
  ];

  useEffect(() => {
    async function fetchTools() {
      try {
        const q = query(collection(db, 'community_tools'), orderBy('createdAt', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const fetchedTools = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityTool));
        setTools(fetchedTools);
      } catch (error) {
        console.error("Error fetching community tools:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTools();
  }, []);

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'ALL' || tool.category === activeCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-retro-yellow border-4 border-retro-black px-4 py-1 rounded-full mb-6 shadow-[4px_4px_0_0_rgba(17,17,17,1)]"
        >
          <Sparkles size={16} className="text-retro-black" />
          <span className="text-[10px] font-black uppercase tracking-widest">Built by the Internet</span>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase leading-none">
          Community <span className="text-white drop-shadow-[4px_4px_0_#111] [-webkit-text-stroke:2px_#111]">Utilities</span>
        </h1>
        <p className="text-xl text-retro-black/70 max-w-2xl mx-auto font-medium">
          Tiny tools. Big creativity. Explore the retro internet workshop powered by independent creators.
        </p>
      </section>

      {/* Featured Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 bg-retro-blue border-2 border-retro-black flex items-center justify-center text-white">★</span>
            Featured Spotlight
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {tools.filter(t => t.featured).slice(0, 2).map((tool, idx) => (
             <FeaturedCard key={tool.id} tool={tool} index={idx} />
           ))}
           {tools.filter(t => t.featured).length === 0 && (
             <div className="col-span-full retro-card bg-white p-12 text-center border-dashed border-4">
                <p className="text-retro-black/40 font-bold uppercase tracking-widest">No featured tools yet. Your project could be here!</p>
             </div>
           )}
        </div>
      </section>

      {/* Toolbox Controls */}
      <div className="sticky top-28 z-30 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-[#FDFCF0] py-4 bg-opacity-80 backdrop-blur-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-retro-black/40" size={20} />
          <input 
            type="text" 
            placeholder="SEARCH THE DISTRICT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full retro-input bg-white pl-12 pr-4 py-3 placeholder:text-retro-black/20"
          />
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <Link 
            to="/submit" 
            className="retro-button bg-retro-green flex items-center gap-2 w-full md:w-auto"
          >
            <Plus size={20} />
            PUBLISH TO DISTRICT
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 border-2 border-retro-black font-black text-[10px] tracking-widest uppercase transition-all ${
              activeCategory === cat 
                ? 'bg-retro-black text-white translate-x-[2px] translate-y-[2px] shadow-none' 
                : 'bg-white text-retro-black shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="retro-card bg-white h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTools.map((tool, idx) => (
            <CommunityToolCard key={tool.id} tool={tool} index={idx} />
          ))}
        </div>
      )}

      {/* Stats Counter */}
      <div className="mt-20 border-t-4 border-retro-black pt-12 flex flex-wrap justify-center gap-12">
        <ServerStat label="UTILITIES DEPLOYED" value={tools.length.toString()} />
        <ServerStat label="COMMUNITY NODE" value="ACTIVE" color="text-retro-green" />
        <ServerStat label="CHAOS LEVEL" value="STABLE" color="text-retro-blue" />
        <ServerStat label="EST." value="2026" />
      </div>
    </div>
  );
}

function CommunityToolCard({ tool, index }: { tool: CommunityTool, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="retro-card bg-white p-6 flex flex-col h-full group hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_rgba(17,17,17,1)]"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 border-4 border-retro-black bg-retro-beige flex items-center justify-center group-hover:rotate-6 transition-transform">
           {/* Placeholder for Dynamic Icon */}
           <Sparkles size={24} />
        </div>
        <div className="flex gap-2">
          {tool.stickers?.slice(0, 2).map((s, i) => (
            <span key={i} className="text-[10px] font-black uppercase tracking-tighter px-2 py-1 bg-retro-yellow border-2 border-retro-black shadow-[2px_2px_0_0_rgba(17,17,17,1)]">
              {s}
            </span>
          ))}
        </div>
      </div>
      
      <h3 className="text-xl font-black uppercase mb-1">{tool.name}</h3>
      <p className="text-xs font-bold text-retro-black/60 mb-4 tracking-tight uppercase">{tool.tagline}</p>
      
      <p className="text-sm line-clamp-3 mb-6 text-retro-black/80 flex-grow">
        {tool.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-retro-black/10">
        <Link 
          to={`/creator/${tool.creatorId}`}
          className="text-[10px] font-black uppercase flex items-center gap-2 hover:text-retro-blue"
        >
          <div className="w-6 h-6 rounded-full border-2 border-retro-black bg-retro-gray" />
          BY {tool.creatorName}
        </Link>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 group/btn">
            <Heart size={16} className="group-hover/btn:fill-retro-red group-hover/btn:text-retro-red transition-colors" />
            <span className="text-xs font-black">{tool.upvotes}</span>
          </button>
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 border-2 border-retro-black flex items-center justify-center hover:bg-retro-black hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedCard({ tool, index }: { tool: CommunityTool, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="retro-card bg-retro-black text-white p-8 group overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-4">
         <span className="bg-retro-red text-white border-2 border-white px-3 py-1 font-black text-xs uppercase tracking-widest animate-pulse">FEATURED</span>
      </div>
      
      <div className="flex gap-6 mb-6">
        <div className="w-16 h-16 bg-white border-4 border-white flex items-center justify-center text-retro-black group-hover:rotate-12 transition-transform shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">
           <Sparkles size={32} />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase mb-1 tracking-tighter">{tool.name}</h3>
          <p className="text-sm font-bold text-retro-yellow uppercase tracking-widest">{tool.tagline}</p>
        </div>
      </div>

      <p className="text-white/80 mb-8 max-w-lg">
        {tool.description}
      </p>

      <div className="flex items-center gap-4">
        <a 
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button bg-retro-blue border-white text-white hover:bg-white hover:text-retro-black"
        >
          EXPLORE TOOL
        </a>
        <Link 
          to={`/creator/${tool.creatorId}`}
          className="text-xs font-black uppercase border-b-2 border-white hover:text-retro-yellow transition-colors"
        >
          AUTHOR: {tool.creatorName}
        </Link>
      </div>
    </motion.div>
  );
}

function ServerStat({ label, value, color = "text-retro-black" }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] font-black uppercase tracking-widest text-retro-black/40 mb-2">{label}</span>
      <span className={`text-2xl font-black font-display ${color} tracking-tighter`}>{value}</span>
    </div>
  );
}
