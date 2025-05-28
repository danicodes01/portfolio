import { Project } from "@/types/project";
import { getDictionary } from "@/app/[lang]/dictionaries";
import classes from "./project-item.module.css";
import Link from "next/link";
import Video from "@/components/video/video";
import Image from "next/image";

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
  summaryDe, // Add German summary
  summaryFr, // Add French summary
  summaryZh,
  summaryAr,
  summaryJa,
  lang = 'en' 
}: ProjectItemProps) {
  const dict = await getDictionary(lang);

  const mediaIsVideo = isVideo(media[0]);
  const mediapath = getAbsolutePath(media[0]);
  
  // Multi-language summary selection
  const getLocalizedSummary = (): string => {
    switch (lang) {
      case 'es':
        return summaryEs || summary;
      case 'de':
        return summaryDe || summary;
      case 'fr':
        return summaryFr || summary;
      case 'zh':
        return summaryZh || summary;
      case 'ar':
        return summaryAr || summary;
      case 'ja':
        return summaryJa || summary;
      case 'en':
      default:
        return summary;
    }
  };

  const displaySummary = getLocalizedSummary();
  
  return (
    <div className={classes.container}>
      <Link href={`/${lang}/projects/${slug}`} className=''>
        <li className={classes.post}>
          <div className={classes.border}>
            <h1>{title}</h1>
            <div className={classes.images}>
              {mediaIsVideo ? (
                <Video media={media[0]} />
              ) : (
                <Image
                  src={media[0]}
                  alt={title}
                  fill
                  className={classes.image}
                  priority={false}
                  quality={85}
                />
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