import styles from './page.module.css';
import { getDictionary } from '../dictionaries';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return {
    title: `Daniel Knowles | ${dict.resume.metaTitle}`,
    description: dict.resume.metaDescription,
  };
}

export default async function Resume({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const r = dict.resume;

  return (
    <div className={styles.resumePage}>
      <div className={styles.resumeContent}>

        <h1>Daniel Knowles</h1>
        <p className={styles.jobTitle}>{r.jobTitle}</p>
        <p className={styles.summary}>{r.summary}</p>

        <div className={styles.contact}>
          <p><a href="tel:7188736651" className={styles.link}>(718) 873-6651</a></p>
          <p><a href="mailto:danielgene.dev@gmail.com" className={styles.link}>danielgene.dev@gmail.com</a></p>
          <p><a href="https://danicodes.org" target="_blank" rel="noopener noreferrer" className={styles.link}>danicodes.org</a></p>
          <p><a href="https://github.com/danicodes01" target="_blank" rel="noopener noreferrer" className={styles.link}>github.com/danicodes01</a></p>
          <p><a href="https://linkedin.com/in/danicodes01" target="_blank" rel="noopener noreferrer" className={styles.link}>linkedin.com/in/danicodes01</a></p>
        </div>

        <div className={styles.section}>
          <h2>{r.keyAchievementsTitle}</h2>
          <ul>{r.keyAchievements.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
        </div>

        <div className={styles.section}>
          <h2>{r.workExperience}</h2>

          <div className={styles.job}>
            <h3>{r.job0.title}</h3>
            <p className={styles.duration}>{r.job0.duration}</p>
            <ul>{r.job0.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
          </div>

          <div className={styles.job}>
            <h3>{r.job1.title}</h3>
            <p className={styles.duration}>{r.job1.duration}</p>
            <ul>{r.job1.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
          </div>

          <div className={styles.job}>
            <h3>{r.job2.title}</h3>
            <p className={styles.duration}>{r.job2.duration}</p>
            <ul>{r.job2.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
          </div>

          <div className={styles.job}>
            <h3>{r.job3.title}</h3>
            <p className={styles.duration}>{r.job3.duration}</p>
            <h4>{r.job3.role1.title}</h4>
            <p className={styles.duration}>{r.job3.role1.duration}</p>
            <ul>{r.job3.role1.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
            <h4>{r.job3.role2.title}</h4>
            <p className={styles.duration}>{r.job3.role2.duration}</p>
            <ul>{r.job3.role2.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
          </div>

          <div className={styles.job}>
            <h3>{r.job4.title}</h3>
            <p className={styles.duration}>{r.job4.duration}</p>
            <ul>{r.job4.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
          </div>
        </div>

        <div className={styles.section}>
          <h2>{r.projects}</h2>
          <div className={styles.project}>
            <p><strong>Intergalactic Code Academy:</strong> <a href="https://ica-app-teal.vercel.app/game" target="_blank" rel="noopener noreferrer" className={styles.link}>https://ica-app-teal.vercel.app/game</a> — {r.projectDescriptions.ica}</p>
          </div>
          <div className={styles.project}>
            <p><strong>DistortNewYork:</strong> <a href="https://distortnewyork.com" target="_blank" rel="noopener noreferrer" className={styles.link}>https://distortnewyork.com</a> — {r.projectDescriptions.distortNewYork}</p>
          </div>
          <div className={styles.project}>
            <p><strong>RealWorldNews:</strong> <a href="https://realworldnews.org" target="_blank" rel="noopener noreferrer" className={styles.link}>https://realworldnews.org</a> — {r.projectDescriptions.realWorldNews}</p>
          </div>
          <div className={styles.project}>
            <p><strong>Portfolio:</strong> <a href="https://danicodes.org" target="_blank" rel="noopener noreferrer" className={styles.link}>https://danicodes.org</a> — {r.projectDescriptions.portfolio}</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2>{r.coreSkills}</h2>
          <div className={styles.skillsGrid}>
            <div className={styles.skillRow}><strong>Languages:</strong> JavaScript, TypeScript, Python, C#</div>
            <div className={styles.skillRow}><strong>Frameworks:</strong> React, Next.js, React Native, Node.js, Spring Boot, .NET</div>
            <div className={styles.skillRow}><strong>AI / ML:</strong> LangGraph, OpenAI, Anthropic, LangChain, RAG pipelines, vector search</div>
            <div className={styles.skillRow}><strong>Data & Backend:</strong> PostgreSQL, Prisma, REST APIs, distributed systems</div>
            <div className={styles.skillRow}><strong>Infrastructure:</strong> AWS, Azure, Docker, Kubernetes</div>
            <div className={styles.skillRow}><strong>Analytics:</strong> GA4, Google Tag Manager, Looker Studio</div>
          </div>
        </div>

        <div className={styles.section}>
          <h2>{r.education}</h2>
          <div className={styles.job}>
            <h3>Operation Spark — Advanced Software Engineering Immersive</h3>
            <p className={styles.duration}>June 2021</p>
          </div>
        </div>

        <div className={styles.section}>
          <h2>{r.additional}</h2>
          <p><strong>{r.spokenLanguages}</strong> {r.english}, {r.spanish}</p>
        </div>

      </div>
    </div>
  );
}
