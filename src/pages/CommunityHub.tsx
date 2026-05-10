import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, query, orderBy, getDocs, limit, doc, getDoc, writeBatch, increment, serverTimestamp } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CommunityTool } from '../types/community';
import { Search, Plus, Sparkles, ChevronRight, Heart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import CommunityToolCard from '../components/CommunityToolCard';

export default function CommunityHub() {
  const [user] = useAuthState(auth);
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
             <FeaturedCard key={tool.id} tool={tool} index={idx} userId={user?.uid} />
           ))}
           {tools.filter(t => t.featured).length === 0 && (
             <div className="col-span-full retro-card bg-white p-12 text-center border-dashed border-4">
                <p className="text-retro-black/40 font-bold uppercase tracking-widest">No featured tools yet. Your project could be here!</p>
             </div>
           )}
        </div>
      </section>

      {/* Toolbox Controls */}
      <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-retro-beige border-b-4 border-retro-black py-6">
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
            <CommunityToolCard key={tool.id} tool={tool} index={idx} userId={user?.uid} />
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

const FeaturedCard: React.FC<{ tool: CommunityTool, index: number, userId?: string }> = ({ tool, index, userId }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(tool.upvotes || 0);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    async function checkUpvote() {
      if (!userId) {
        setUpvoted(false);
        return;
      }
      try {
        const upvoteDoc = await getDoc(doc(db, 'community_tools', tool.id, 'user_upvotes', userId));
        setUpvoted(upvoteDoc.exists());
      } catch (error) {
        console.error("Error checking upvote:", error);
      }
    }
    checkUpvote();
  }, [userId, tool.id]);

  const handleUpvote = async () => {
    if (!userId) {
      signInWithGoogle();
      return;
    }
    if (loadingAction) return;

    setLoadingAction(true);
    const newUpvoted = !upvoted;
    const batch = writeBatch(db);
    const toolRef = doc(db, 'community_tools', tool.id);
    const upvoteRef = doc(db, 'community_tools', tool.id, 'user_upvotes', userId);

    try {
      if (newUpvoted) {
        batch.update(toolRef, { upvotes: increment(1) });
        batch.set(upvoteRef, { userId, createdAt: serverTimestamp() });
        setUpvoteCount(prev => prev + 1);
      } else {
        batch.update(toolRef, { upvotes: increment(-1) });
        batch.delete(upvoteRef);
        setUpvoteCount(prev => Math.max(0, prev - 1));
      }
      
      await batch.commit();
      setUpvoted(newUpvoted);
    } catch (error) {
      console.error("Upvote error:", error);
      setUpvoteCount(tool.upvotes || 0);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="retro-card bg-retro-black text-white p-8 group overflow-hidden relative h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 p-4">
         <span className="bg-retro-red text-white border-2 border-white px-3 py-1 font-black text-xs uppercase tracking-widest animate-pulse shadow-[2px_2px_0_0_#fff]">FEATURED</span>
      </div>
      
      <div className="flex gap-6 mb-6">
        <div className="w-16 h-16 bg-white border-4 border-white flex items-center justify-center text-retro-black group-hover:rotate-12 transition-transform shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">
           <Sparkles size={32} />
        </div>
        <div>
          <h3 className="text-3xl font-black uppercase mb-1 tracking-tighter leading-none">{tool.name}</h3>
          <p className="text-sm font-bold text-retro-yellow uppercase tracking-widest">{tool.tagline}</p>
        </div>
      </div>

      <p className="text-white/80 mb-8 max-w-lg flex-grow">
        {tool.description}
      </p>

      <div className="flex items-center gap-4 mt-auto">
        <a 
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="retro-button bg-retro-blue border-white text-white hover:bg-white hover:text-retro-black shadow-[4px_4px_0_0_#fff] hover:shadow-none"
        >
          EXPLORE TOOL
        </a>
        <button 
          onClick={handleUpvote}
          disabled={loadingAction}
          className={`flex items-center gap-2 px-4 py-2 border-2 border-white font-black uppercase text-xs transition-all ${
            upvoted 
              ? 'bg-retro-red text-white border-retro-red' 
              : 'hover:bg-white hover:text-retro-black'
          }`}
        >
          {loadingAction ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Heart size={16} className={upvoted ? 'fill-white' : ''} />
          )}
          {upvoteCount}
        </button>
        <Link 
          to={`/creator/${tool.creatorId}`}
          className="ml-auto text-xs font-black uppercase border-b-2 border-transparent hover:border-retro-yellow hover:text-retro-yellow transition-colors"
        >
          BY {tool.creatorName}
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
