import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, signInWithGoogle, isConfigured } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ToolCategory } from '../types/community';
import { Rocket, Link as LinkIcon, Github, Type, FileText, Layout, CheckCircle2, AlertCircle, Settings } from 'lucide-react';

export default function SubmitTool() {
  const [user, loadingAuth] = useAuthState(auth || undefined);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    description: '',
    url: '',
    githubUrl: '',
    category: 'PRODUCTIVITY' as ToolCategory,
    icon: 'Sparkles'
  });

  const categories: ToolCategory[] = [
    'PRODUCTIVITY', 'CREATOR', 'SHARING', 'FINANCE', 'AI', 'EXPERIMENTAL', 'FUN', 'DEVELOPER', 'STUDY'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !db) return;

    setSubmitting(true);
    setError(null);

    const path = 'community_tools';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        creatorId: user.uid,
        creatorName: user.displayName || 'Anonymous Creator',
        upvotes: 0,
        stickers: ['NEW'],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        featured: false
      });
      
      setSuccess(true);
      setTimeout(() => navigate('/community'), 2000);
    } catch (err: any) {
      console.error("Submission error:", err);
      
      let userMessage = "UNEXPECTED SYSTEM ERROR. PLEASE TRY AGAIN LATER.";
      
      if (err.code === 'permission-denied') {
        userMessage = "PROTOCOL VIOLATION: SUBMISSION REJECTED BY DISTRICT SECURITY RULES.";
      } else if (err.code === 'unavailable') {
        userMessage = "CONNECTION LOST: THE DISTRICT SERVER IS CURRENTLY UNREACHABLE.";
      } else if (err.code === 'unauthenticated') {
        userMessage = "SESSION EXPIRED: PLEASE RE-AUTHENTICATE YOUR CREATOR NODE.";
      } else if (err.message?.includes('network')) {
        userMessage = "NETWORK INSTABILITY DETECTED. CHECK YOUR CONNECTION UP-LINK.";
      }

      setError(userMessage);

      // Diagnostic logging as per Firebase integration guidelines
      const errInfo = {
        error: err instanceof Error ? err.message : String(err),
        errorCode: err.code,
        operationType: 'create',
        path,
        authInfo: {
          userId: user?.uid,
          email: user?.email,
          emailVerified: user?.emailVerified,
        }
      };
      console.error('Firestore Diagnostic Info: ', JSON.stringify(errInfo));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto text-center">
        <div className="retro-card bg-white p-12 border-dashed">
          <div className="w-20 h-20 bg-retro-red border-4 border-retro-black flex items-center justify-center mx-auto mb-8 rotate-3 shadow-[8px_8px_0_0_#111]">
             <Settings size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4">SETUP REQUIRED</h2>
          <p className="text-retro-black/60 mb-8 font-bold">
            THE DISTRICT INFRASTRUCTURE IS OFFLINE. <br/>
            PLEASE ADD YOUR FIREBASE KEYS IN THE SETTINGS MENU TO ACTIVATE THE CREATOR PORTAL.
          </p>
        </div>
      </div>
    );
  }

  if (loadingAuth) return <div className="pt-40 text-center font-black">VALIDATING NODE...</div>;

  if (!user) {
    return (
      <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto text-center">
        <div className="retro-card bg-white p-12">
          <div className="w-20 h-20 bg-retro-yellow border-4 border-retro-black flex items-center justify-center mx-auto mb-8 rotate-3">
             <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4">CREATOR AUTH REQUIRED</h2>
          <p className="text-retro-black/60 mb-8 font-bold">You must be logged in to publish tools to the District ecosystem.</p>
          <button 
            onClick={signInWithGoogle}
            className="retro-button bg-retro-black text-white w-full py-4 text-xl"
          >
            SIGN IN WITH GOOGLE
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="pt-40 pb-20 px-6 max-w-2xl mx-auto text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="retro-card bg-retro-green p-12"
        >
          <div className="w-20 h-20 bg-white border-4 border-retro-black flex items-center justify-center mx-auto mb-8 animate-bounce">
             <CheckCircle2 size={40} className="text-retro-green" />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4">DEPLOYMENT SUCCESSFUL!</h2>
          <p className="text-retro-black font-bold">Your utility is now live in the District. Redirecting to hub...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-20 px-6 max-w-3xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">Publish your Utility</h1>
        <p className="text-retro-black/60 font-bold uppercase tracking-widest text-xs">The Digital Frontier awaits your contribution.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Main Info */}
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Type size={14} /> Tool Name
              </label>
              <input 
                required
                type="text"
                placeholder="e.g. FOCUS NODE"
                className="retro-input w-full bg-white p-4"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Layout size={14} /> Tagline
              </label>
              <input 
                required
                type="text"
                placeholder="e.g. MINIMAL POMODORO FOR INDIE DEV"
                className="retro-input w-full bg-white p-4"
                value={formData.tagline}
                onChange={e => setFormData({...formData, tagline: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <LinkIcon size={14} /> Tool URL
              </label>
              <input 
                required
                type="url"
                placeholder="https://your-tool.com"
                className="retro-input w-full bg-white p-4"
                value={formData.url}
                onChange={e => setFormData({...formData, url: e.target.value})}
              />
            </div>
          </section>

          {/* Metadata */}
          <section className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} /> Category
              </label>
              <select 
                className="retro-input w-full bg-white p-4 appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as ToolCategory})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Github size={14} /> GitHub Repository (Optional)
              </label>
              <input 
                type="url"
                placeholder="https://github.com/your-username/repo"
                className="retro-input w-full bg-white p-4"
                value={formData.githubUrl}
                onChange={e => setFormData({...formData, githubUrl: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                <Type size={14} /> Custom Icon Label
              </label>
              <input 
                type="text"
                placeholder="e.g. Sparkles, Zap, Codepen"
                className="retro-input w-full bg-white p-4"
                value={formData.icon}
                onChange={e => setFormData({...formData, icon: e.target.value})}
              />
            </div>
          </section>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <FileText size={14} /> Description
          </label>
          <textarea 
            required
            rows={4}
            placeholder="Tell the district about your creation..."
            className="retro-input w-full bg-white p-4 resize-none"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        {error && (
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="p-4 bg-retro-red/10 border-4 border-retro-black shadow-[4px_4px_0_0_#111] flex items-center gap-4 text-retro-red"
          >
            <div className="w-10 h-10 bg-retro-red border-2 border-retro-black flex items-center justify-center text-white shrink-0">
              <AlertCircle size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest leading-tight">
              {error}
            </span>
          </motion.div>
        )}

        <button 
          disabled={submitting}
          type="submit"
          className="retro-button bg-retro-yellow w-full py-6 text-2xl flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {submitting ? 'DEPLOYING...' : (
            <>
              <Rocket size={24} />
              PUBLISH TO DISTRICT
            </>
          )}
        </button>
      </form>
    </div>
  );
}
