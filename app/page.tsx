import Image from "next/image";
import {Project} from '@/types/project'
import {getProjects} from '@/lib/projects'
import ProjectGrid from '@/components/projects/project-grid'
import classes from './page.module.css'

export default async function Home() {
  const projects: Project[] = await getProjects();
  return (
    <main className={classes.header}>
      <ProjectGrid projects={projects} />
    </main>
  );
}
