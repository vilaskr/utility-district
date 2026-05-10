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
];

export const SOCIALS = {
  github: 'https://github.com/vilaskr',
  twitter: 'https://twitter.com/vilaskr_',
  instagram: 'https://instagram.com/vilaskr_',
  email: 'mailto:vilaskr762@gmail.com'
};
