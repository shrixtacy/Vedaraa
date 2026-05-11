import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  twitterHandle?: string;
}

const SEO = ({ 
  title = "VEDARA - Luxury Interior Design Agency",
  description = "Crafting spaces that speak elegance. Premium interior design by VEDARA.",
  canonical = "https://vedara.design",
  ogType = "website",
  ogImage = "https://vedara.design/og-image.png",
  twitterHandle = "@VEDARA"
}: SEOProps) => {
  const siteTitle = title.includes("VEDARA") ? title : `${title} | VEDARA`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
