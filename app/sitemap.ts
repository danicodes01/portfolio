import type { MetadataRoute } from 'next';
import { getProjects } from '@/lib/projects';

export const revalidate = 3600;

const SITE_URL = 'https://danicodes.org';
const supportedLanguages = ['en', 'es'] as const;

type Lang = (typeof supportedLanguages)[number];

function languageAlternates(path: string) {
  const languages = supportedLanguages.reduce<Record<string, string>>(
    (acc, lang) => {
      acc[lang] = `${SITE_URL}/${lang}${path}`;
      return acc;
    },
    {},
  );
  languages['x-default'] = `${SITE_URL}/en${path}`;
  return languages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  const now = new Date();

  const staticPaths: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
    lastModified: Date;
  }> = [
    { path: '', changeFrequency: 'monthly', priority: 1, lastModified: now },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { path: '/resume', changeFrequency: 'monthly', priority: 0.8, lastModified: now },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of supportedLanguages) {
    for (const { path, changeFrequency, priority, lastModified } of staticPaths) {
      entries.push({
        url: `${SITE_URL}/${lang}${path}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: languageAlternates(path) },
      });
    }

    for (const project of projects) {
      const path = `/projects/${project.slug}`;
      const projectDate = project.date ? new Date(project.date) : null;
      const lastModified =
        projectDate && projectDate.getTime() > 0 ? projectDate : now;
      entries.push({
        url: `${SITE_URL}/${lang}${path}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
        alternates: { languages: languageAlternates(path) },
      });
    }
  }

  return entries;
}
