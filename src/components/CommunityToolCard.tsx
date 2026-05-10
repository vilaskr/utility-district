import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { doc, getDoc, writeBatch, increment, serverTimestamp } from 'firebase/firestore';
import { db, auth, signInWithGoogle } from '../lib/firebase';
import { CommunityTool } from '../types/community';
import { Sparkles, Heart, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CommunityToolCardProps {
  tool: CommunityTool;
  index: number;
  userId?: string;
}

const CommunityToolCard: React.FC<CommunityToolCardProps> = ({ tool, index, userId }) => {
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
      // Revert local state
      setUpvoteCount(tool.upvotes || 0);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 10) * 0.05 }}
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
        <div className="flex items-center gap-3">
          <button 
            onClick={handleUpvote}
            disabled={loadingAction}
            className={`flex items-center gap-2 px-3 py-1.5 border-2 border-retro-black transition-all active:translate-y-0.5 active:shadow-none ${
              upvoted 
                ? 'bg-retro-red text-white shadow-none translate-y-0.5' 
                : 'bg-white text-retro-black shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)]'
            }`}
          >
            {loadingAction ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Heart size={16} className={upvoted ? 'fill-white' : 'group-hover:fill-retro-red'} />
            )}
            <span className="text-xs font-black">{upvoteCount}</span>
          </button>
          
          <a 
            href={tool.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 border-2 border-retro-black flex items-center justify-center bg-white shadow-[4px_4px_0_0_rgba(17,17,17,1)] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_rgba(17,17,17,1)] transition-all active:translate-y-0.5 active:shadow-none"
            title="Open Tool"
          >
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityToolCard;
