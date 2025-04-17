import type { MetadataRoute } from 'next';
import { getProjects } from "@/lib/projects";

export const revalidate = 3600;

const supportedLanguages = ['en', 'es'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  
  const entries: Array<{
    url: string;
    lastModified: Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
  }> = [];
  
  supportedLanguages.forEach(lang => {
    entries.push({
      url: `https://www.danicodes.org/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    });
    
    entries.push({
      url: `https://www.danicodes.org/${lang}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    });
    
    entries.push({
      url: `https://www.danicodes.org/${lang}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    });
  });
  
  supportedLanguages.forEach(lang => {
    projects.forEach(project => {
      entries.push({
        url: `https://www.danicodes.org/${lang}/projects/${project.slug}`,
        lastModified: new Date(project.date),
        changeFrequency: 'weekly',
        priority: 0.7
      });
    });
  });
  
  return entries;
}