import type { Metadata } from 'next/dist/lib/metadata/types/metadata-interface';
import { getDictionary } from "../dictionaries"; 
import classes from "./page.module.css";
import Link from "next/link";

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  
  return {
    title: dict.contact.title,
  };
}

export default async function ContactPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  
  const dict = await getDictionary(lang);
  
  return (
    <div className={classes.contact}>
      <header className={classes.header}>
        <h1>{dict.contact.title}</h1>
        <p>
          {dict.contact.intro}
        </p>
      </header>
      <main className={classes.info}>
        <p><span className={classes.highlight}>{dict.contact.email}</span>{" "}
          <a href="mailto:danielgene.dev@gmail.com" className={classes.link}>
            danielgene.dev@gmail.com
          </a>
        </p>
        <p><span className={classes.highlight}>{dict.contact.linkedin}</span>{" "}
          <Link href="https://www.linkedin.com/in/danicodes01/" className={classes.link}>
            {dict.contact.linkedinLink}
          </Link>
        </p>
        <p><span className={classes.highlight}>{dict.contact.github}</span>{" "}
          <Link href="https://github.com/danicodes01" className={classes.link}>
            {dict.contact.githubLink}
          </Link>
        </p>
        <p><span className={classes.highlight}>{dict.contact.resume}</span>{" "}
          <Link href={`/${lang}/resume`} className={classes.link}>
            {dict.contact.resumeLink}
          </Link>
        </p>
      </main>
    </div>
  );
}