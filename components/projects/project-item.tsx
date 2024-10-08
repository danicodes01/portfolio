import { Project } from "@/types/project";
import classes from "./project-item.module.css";
import Link from "next/link";
import Video from "@/components/video/video";

const isVideo = (media: string): boolean => {
  const videoIndicators = ["video", ".mp4", ".webm", ".ogg", ".mov"];
  return videoIndicators.some((indicator) => media.includes(indicator));
};

export default function ProjectItem({ slug, title, media, summary }: Project) {
  const mediaIsVideo = isVideo(media[0]);
  return (
    <div className={classes.container}>
      <Link href={`/projects/${slug}`} className=''>
      <li className={classes.post}>
        <div className={classes.border}>
          <h1>{title}</h1>
          <div className={classes.images}>
            {mediaIsVideo ? (
              <Video media={media[0]} />
            ) : (
              <img src={media[0]} alt={slug} />
            )}
          </div>
          <div className={classes.content}>
            <p>{summary}</p>
          </div>
        {/* <hr className={classes.hr}/> */}
        </div>
      </li>
        </Link>
    </div>
  );
}
