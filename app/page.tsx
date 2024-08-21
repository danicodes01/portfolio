import Image from "next/image";
import {Project} from '@/types/project'
import {getProjects} from '@/lib/projects'

export default async function Home() {
  const projects: Project[] = await getProjects();
  return (
    <div>
      hello

      {projects.map(proj => (
        <img src={proj.media[0]}/>
      ))}
    </div>
  );
}
