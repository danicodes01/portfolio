import Image from "next/image";
import {Project} from '@/types/project'
import {getProjects} from '@/lib/projects'
import ProjectGrid from '@/components/projects/project-grid'
import { getDictionary } from "@/app/[lang]/dictionaries";
import classes from './page.module.css'

export default async function Home({ 
  params
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const defaultLang = lang || 'en';
  const projects: Project[] = await getProjects();
  const dict = await getDictionary(defaultLang);

  return (
    <main className={classes.header}>
      <ProjectGrid 
        projects={projects} 
        lang={defaultLang} 
      />
    </main>
  );
}