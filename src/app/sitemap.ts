import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  // Core clinic pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Homepage gets highest priority
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0, // Homepage gets highest priority
    },
    {
      url: `${baseUrl}/dermatologist`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8, 
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7, 
    },
  ];

  return [
    ...staticRoutes,
  ];
}