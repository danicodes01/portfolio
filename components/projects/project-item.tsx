import { Project } from "@/types/project";
import { getDictionary } from "@/app/[lang]/dictionaries";
import classes from "./project-item.module.css";
import Link from "next/link";
import Video from "@/components/video/video";

const isVideo = (media: string): boolean => {
  const videoIndicators = ["video", ".mp4", ".webm", ".ogg", ".mov"];
  return videoIndicators.some((indicator) => media.includes(indicator));
};

// Helper function to ensure we have absolute paths
const getAbsolutePath = (path: string): string => {
  // Remove language prefix if present (like /en/)
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
};

interface ProjectItemProps extends Project {
  lang: string; 
}

export default async function ProjectItem({ 
  slug, 
  title, 
  media, 
  summary, 
  summaryEs,
  lang = 'en' 
}: ProjectItemProps) {
  const dict = await getDictionary(lang);

  const mediaIsVideo = isVideo(media[0]);
  const mediapath = getAbsolutePath(media[0]);
  
  const displaySummary = lang === 'es' 
    ? (summaryEs || summary) 
    : summary;
  
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
              <p>{displaySummary}</p>
            </div>
          </div>
        </li>
      </Link>
    </div>
  );
}