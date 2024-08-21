import Image from "next/image";
import {Project} from '@/types/project'
import {getProjects} from '@/lib/projects'

export default async function Home() {
  const projects: Project[] = await getProjects();
  return (
    <div>
      hello

      {projects.map(p => (
        <img key={p.id} src={p.media[0]} alt="hello"/>
      ))}
    </div>
  );
}
