import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: "https://www.danicodes.org/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.danicodes.org/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectUrls: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `https://www.danicodes.org/projects/${project.slug}`,
    lastModified: new Date(project.date),
    changeFrequency: "weekly" as const,  
    priority: 0.7,
  }));

  return [...baseUrls, ...projectUrls];
}
