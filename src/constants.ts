export interface AppUtility {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  category: string;
  url: string;
  color: string;
  stickers?: string[];
}

export const APPS: AppUtility[] = [
  {
    id: 'blink-qr',
    name: 'Blink QR',
    tagline: 'Scan. Share. Done.',
    description: 'Instant QR code generator with stylish customization for modern links.',
    icon: 'QrCode',
    category: 'UTILITY',
    url: 'https://blink-qr.vercel.app/', // 👈 ADD YOUR APP URL HERE
    color: 'bg-retro-blue',
    stickers: ['NEW', 'FAST']
  },
  {
    id: 'quick-split',
    name: 'Quick Split',
    tagline: 'Trips Without Confusion',
    description: 'Split expenses and calculate who owes whom instantly without any friction.',
    icon: 'Divide',
    category: 'FINANCE',
    url: 'https://quicksplit-cyan.vercel.app/', // 👈 ADD YOUR APP URL HERE
    color: 'bg-retro-green',
    stickers: ['HOT','NEW']
  },
  {
    id: 'relay',
    name: 'Relay Drop',
    tagline: 'Send Without Friction',
    description: 'Temporary ultra-fast file and text transfer tool for quick sharing.',
    icon: 'Radio',
    category: 'TRANSFER',
    url: 'https://relaydrop.onrender.com/', // 👈 ADD YOUR APP URL HERE
    color: 'bg-retro-red',
    stickers: ['BETA']
  },
  {
    id: 'borrow-back',
    name: 'BorrowBack',
    tagline: 'Never Forget Loans',
    description: 'Track borrowed money and returned items easily with reminders.',
    icon: 'Banknote',
    category: 'TRACKER',
    url: 'https://borrowback.vercel.app/', // 👈 ADD YOUR APP URL HERE
    color: 'bg-retro-yellow',
    stickers: ['POPULAR','HANDY']
  },
  {
    id: 'minitrip',
    name: 'MINI TRIP PLANNER',
    tagline: "Plan or Die",
    description: "Plan your trip now instead of saying 'We will plan'",
    icon: 'Plane',
    category: 'PLANNER',
    url: 'https://minitrip.vercel.app/',
    color: 'bg-retro-yellow',
    stickers: ['BETA']
  },
  {
  id: 'humanlibrary',
  name: 'HUMAN LIBRARY',
  tagline: "Every Stranger Has a Story",
  description: "Read real people's stories, share your journey, and connect through authentic human experiences.",
  icon: 'BookOpen',
  category: 'SOCIAL',
  url: 'https://human-library-three.vercel.app/',
  color: 'bg-retro-blue',
  stickers: ['NEW','BETA']
},
{
  id: 'legacyvault',
  name: 'LEGACY VAULT',
  tagline: "Your Legacy, Protected Forever",
  description: "Securely preserve your confidential documents, memories, final wishes, and digital assets for trusted loved ones to access under your chosen legacy policies.",
  icon: 'ShieldCheck',
  category: 'SECURITY',
  url: 'https://legacy-vault-delta.vercel.app/',
  color: 'bg-retro-purple',
  stickers: ['COMING SOON']
},
{
  id: 'cipher-drop',
  name: 'Cipher Drop',
  tagline: 'Encrypt. Share. Decode.',
  description: 'Securely encode and decode secret messages with an elegant cipher tool built for privacy and fun.',
  icon: 'Shield',
  category: 'UTILITY',
  url: 'https://cipher-drop-alpha.vercel.app/',
  color: 'bg-retro-purple',
  stickers: ['NEW', 'SECURE']
},
{
  id: 'frame-crop',
  name: 'Frame Crop',
  tagline: 'Crop Once. Post Everywhere.',
  description: 'Instantly crop any image for Instagram, YouTube, X, LinkedIn, Facebook, and more with perfectly optimized presets.',
  icon: 'Crop',
  category: 'CREATOR',
  url: 'https://frame-crop.vercel.app/',
  color: 'bg-retro-orange',
  stickers: ['NEW', 'CREATORS']
}
];

export const SOCIALS = {
  github: 'https://github.com/vilaskr',
  twitter: 'https://twitter.com/vilaskr_',
  instagram: 'https://instagram.com/vilaskr_',
  email: 'mailto:vilaskr762@gmail.com'
};
