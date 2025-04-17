import { Project } from "@/types/project";
import ProjectItem from "./project-item";
import classes from './project-grid.module.css';

interface ProjectGridProps {
  projects: Project[];
  lang: string;
}

export default function ProjectGrid({ projects, lang }: ProjectGridProps) {
  return (
    <ul className={classes.project}>
      {projects.map((p) => (
        <ProjectItem key={p.id} {...p} lang={lang} />
      ))}
    </ul>
  );
}
