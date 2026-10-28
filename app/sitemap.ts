import type { MetadataRoute } from 'next';

const baseUrl = 'https://freemium-ai.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/pricing', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
