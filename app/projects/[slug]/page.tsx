import { getProject } from "@/lib/projects";
import classes from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import Video from "@/components/video/video";
import Link from "next/link";

interface ProjectDetailParams {
  params: {
    slug: string;
  };
}
const isVideo = (media: string): boolean => {
  const videoIndicators = ["video", ".mp4", ".webm", ".ogg", ".mov"];
  return videoIndicators.some((indicator) => media.includes(indicator));
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailParams) {
  const project = await getProject(params.slug);
  const mediaIsVideo = isVideo(project.media[1]);

  if (!project) {
    notFound();
  }

  if (typeof project.info === "string") {
    project.info = project.info.replace(/\\n/g, "<br />");
  }

  return (
    <>
      <header className={classes.header}>
        <Link href={`${project.link}`} className=''>
          <div className={classes.image}>
            {mediaIsVideo ? (
              <Video media={project.media[1]} />
            ) : (
              <Image src={project.media[1]} alt={project.slug} fill />
            )}
          </div>
        </Link>
        <div className={classes.info}>
          <Link href={`${project.link}`} className=''>
            <p
              className={
                project.title == "STARFLEET" ? classes.title : undefined
              }
            >
              {project.title}
            </p>
            {project.title == "STARFLEET" ? (
              <p>play here</p>
            ) : (
              <p>go to {project.title}</p>
            )}
          </Link>
          {project.repo.length !== 0 && (
            <Link href={`${project.repo}`} className=''>
              <p>visit the repo</p>
            </Link>
          )}
        </div>
        <main>
          <p
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: project.info,
            }}
          ></p>
        </main>
      </header>
    </>
  );
}
