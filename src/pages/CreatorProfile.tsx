import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CommunityTool, CreatorProfile as CreatorType } from '../types/community';
import { motion } from 'motion/react';
import { Github, Twitter, Globe, Heart, Package } from 'lucide-react';
import CommunityToolCard from '../components/CommunityToolCard';

export default function CreatorProfile() {
  const { id } = useParams<{ id: string }>();
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<CreatorType | null>(null);
  const [tools, setTools] = useState<CommunityTool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreatorData() {
      if (!id) return;
      try {
        // Fetch creator info (for now we might not have a full profile doc, so we'll defaults)
        const creatorDoc = await getDoc(doc(db, 'creators', id));
        if (creatorDoc.exists()) {
          setProfile(creatorDoc.data() as CreatorType);
        } else {
          // Fallback if profile doesn't exist yet but tools exist
          setProfile({
            uid: id,
            name: 'Creator Node',
            totalLikes: 0,
            createdAt: new Date().toISOString()
          } as CreatorType);
        }

        // Fetch creator's tools
        const q = query(collection(db, 'community_tools'), where('creatorId', '==', id));
        const snapshot = await getDocs(q);
        setTools(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CommunityTool)));
      } catch (error) {
        console.error("Error fetching creator data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCreatorData();
  }, [id]);

  if (loading) return <div className="pt-40 text-center font-black">SYNCING CREATOR DATA...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* Header Profile Section */}
      <div className="retro-card bg-white p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="w-32 h-32 border-8 border-retro-black shadow-[8px_8px_0_0_rgba(17,17,17,1)] bg-retro-gray flex-shrink-0">
           {profile?.avatar ? (
             <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full flex items-center justify-center text-4xl font-black bg-retro-blue text-white">
               {profile?.name.charAt(0)}
             </div>
           )}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-1">{profile?.name}</h1>
              <div className="flex items-center gap-4 text-xs font-black uppercase text-retro-black/40">
                <span className="flex items-center gap-1"><Package size={14} /> {tools.length} Tools</span>
                <span className="flex items-center gap-1"><Heart size={14} /> {tools.reduce((acc, t) => acc + (t.upvotes || 0), 0)} Total Likes</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {profile?.github && <SocialLink icon={<Github size={18} />} href={profile.github} />}
              {profile?.twitter && <SocialLink icon={<Twitter size={18} />} href={profile.twitter} />}
              {profile?.website && <SocialLink icon={<Globe size={18} />} href={profile.website} />}
            </div>
          </div>
          
          <p className="text-retro-black/80 font-medium mb-6 max-w-2xl">
            {profile?.bio || "A dedicated builder in the Utility District. Crafting independent tools for a better, more retro web experience."}
          </p>
          
          {profile?.badge && (
            <span className="inline-block px-3 py-1 bg-retro-yellow border-2 border-retro-black text-[10px] font-black uppercase tracking-widest shadow-[4px_4px_0_0_rgba(17,17,17,1)] translate-y-[-2px]">
              {profile.badge}
            </span>
          )}
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <h2 className="text-2xl font-black uppercase mb-8 border-b-4 border-retro-black pb-4 flex items-center gap-3">
          <Package className="text-retro-blue" />
          PUBLISHED UTILITIES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool, idx) => (
            <CommunityToolCard 
              key={tool.id} 
              tool={tool} 
              index={idx} 
              userId={user?.uid} 
            />
          ))}
          
          {tools.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-retro-black/20 font-black uppercase text-xl leading-none">NO TOOLS DEPLOYED BY THIS NODE YET.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialLink({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 retro-border bg-white flex items-center justify-center hover:bg-retro-black hover:text-white transition-all transform hover:-rotate-12"
    >
      {icon}
    </a>
  );
}
