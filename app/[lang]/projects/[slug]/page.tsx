import { getProject } from '@/lib/projects';
import { getDictionary } from '../../dictionaries';
import classes from './page.module.css';
import Image from 'next/image';
import Video from '@/components/video/video';
import Link from 'next/link';

type ProjectDetailParams = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function localizedInfo(project: Awaited<ReturnType<typeof getProject>>, lang: string) {
  switch (lang) {
    case 'es':
      return project.infoEs || project.info;
    default:
      return project.info;
  }
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function truncate(text: string, max = 160) {
  const clean = stripHtml(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + '…';
}

export async function generateMetadata({ params }: ProjectDetailParams) {
  const { lang, slug } = await params;
  const project = await getProject(slug);

  const description = truncate(localizedInfo(project, lang));
  const ogImage = project.media?.[0];
  const path = `/${lang}/projects/${project.slug}`;

  return {
    title: project.title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: path,
      languages: {
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
        'x-default': `/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} — Daniel Knowles`,
      description,
      url: path,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage, alt: project.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Daniel Knowles`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

const isVideo = (media: string): boolean => {
  const videoIndicators = ['video', '.mp4', '.webm', '.ogg', '.mov'];
  return videoIndicators.some(indicator => media.includes(indicator));
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailParams) {
  const { lang, slug } = await params;

  const project = await getProject(slug);
  const dict = await getDictionary(lang);

  const mediaIsVideo = isVideo(project.media[1]);
  const isDeployed = project.link !== 'app store';

  // Multi-language project info selection
  const getLocalizedProjectInfo = (): string => {
    switch (lang) {
      case 'es':
        return project.infoEs || project.info;
      case 'de':
        return project.infoDe || project.info;
      case 'fr':
        return project.infoFr || project.info;
      case 'zh':
        return project.infoZh || project.info;
      case 'ar':
        return project.infoAr || project.info;
      case 'ja':
        return project.infoJa || project.info;
      case 'ru':
        return project.infoRu || project.info;
      case 'en':
      default:
        return project.info;
    }
  };

  const projectInfo = getLocalizedProjectInfo();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://www.danicodes.org/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: project.title,
        item: `https://www.danicodes.org/${lang}/projects/${project.slug}`,
      },
    ],
  };

  function projectTitle() {
    if (project.title == 'STARFLEET') {
      return (
        <Link href={`${project.link}`} target="_blank" rel="noopener noreferrer" className=''>
          <p className={'STARFLEET'}>{project.title}</p>
          <p>{dict.projectPage.playHere}</p>
        </Link>
      );
    } else if (project.title == 'ODNU') {
      return (
        <div>
          <p>{project.title}</p>
          <p>{dict.projectPage.comingSoon}</p>
        </div>
      );
    } else {
      return (
        <Link href={`${project.link}`} target="_blank" rel="noopener noreferrer" className=''>
          <p>{project.title}</p>
          <p>
            {dict.projectPage.goToProject} {project.title}
          </p>
        </Link>
      );
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c'),
        }}
      />
      <header className={classes.header}>
        <Link
          href={isDeployed ? `${project.link}` : `${project.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className=''
        >
          <div className={classes.image}>
            {mediaIsVideo ? (
              <Video media={project.media[1]} />
            ) : (
              <Image src={project.media[1]} alt={project.slug} fill />
            )}
          </div>
        </Link>
        <div className={classes.info}>
          {projectTitle()}
          {project.repo.length !== 0 && (
            <Link href={`${project.repo}`} target="_blank" rel="noopener noreferrer" className=''>
              <p>{dict.projectPage.visitRepo}</p>
            </Link>
          )}
        </div>
        <main>
          <p
            className={classes.description}
            dangerouslySetInnerHTML={{
              __html: projectInfo,
            }}
          ></p>
        </main>
      </header>
    </>
  );
}