import type { MetadataRoute } from 'next';

export const revalidate = 3600;

const SITE_URL = 'https://www.danicodes.org';
const supportedLanguages = ['en', 'es'] as const;

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
  }

  return entries;
}
