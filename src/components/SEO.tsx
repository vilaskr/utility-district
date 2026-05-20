import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: string;
  image?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  type = 'website',
  image = 'https://utility-district.vercel.app/og-image.png'
}: SEOProps) {
  const baseTitle = 'UTILITY DISTRICT';
  const fullTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} | Retro Digital Utility Hub`;
  const defaultDesc = 'A polished retro-styled utility hub for indie tools by Vilas K R.';
  const siteUrl = 'https://utility-district.vercel.app';

  useEffect(() => {
    // Update Document Title
    document.title = fullTitle;

    // Update Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || defaultDesc);
    }

    // Update Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || 'utility, tools, indie, retro, productivity');
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description || defaultDesc);

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute('content', type);

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute('content', image);

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', fullTitle);

    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute('content', description || defaultDesc);

    const twitterImage = document.querySelector('meta[property="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute('content', image);

  }, [fullTitle, description, keywords, type, image]);

  return null;
}
