export type ToolCategory = 'PRODUCTIVITY' | 'CREATOR' | 'SHARING' | 'FINANCE' | 'AI' | 'EXPERIMENTAL' | 'FUN' | 'DEVELOPER' | 'STUDY';

export interface CommunityTool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  githubUrl?: string;
  icon: string;
  category: ToolCategory;
  creatorId: string;
  creatorName: string;
  upvotes: number;
  stickers: string[];
  createdAt: any;
  updatedAt: any;
  featured?: boolean;
}

export interface CreatorProfile {
  uid: string;
  name: string;
  bio?: string;
  avatar?: string;
  github?: string;
  twitter?: string;
  website?: string;
  totalLikes: number;
  badge?: string;
  createdAt: any;
}
