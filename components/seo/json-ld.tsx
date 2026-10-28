// components/seo/json-ld.tsx
export default function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Freemium AI',
        url: 'https://freemium-ai.vercel.app',
        logo: 'https://freemium-ai.vercel.app/icon.png',
      },
      {
        '@type': 'WebSite',
        name: 'Freemium AI',
        url: 'https://freemium-ai.vercel.app',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}