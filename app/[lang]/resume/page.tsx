import Link from 'next/link';
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
  return (
    <div className={styles.resumePage}>
      <div className={styles.resumeContent}>
        <h1>Daniel Knowles</h1>
        <p className={styles.jobTitle}>{dict.resume.jobTitle}</p>
        <div className={styles.contact}>
          <p>
            {dict.resume.email}{' '}
            <a href='mailto:danielgene.dev@gmail.com' className={styles.link}>
              danielgene.dev@gmail.com
            </a>
          </p>
          <p>
            {dict.resume.phone}{' '}
            <a href='tel:7188736651' className={styles.link}>
              (718) 873-6651
            </a>
          </p>
          <p>
            {dict.resume.portfolio}{' '}
            <a
              href='https://danicodes.org'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              danicodes.org
            </a>
          </p>
          <p>
            GitHub:{' '}
            <a
              href='https://github.com/danicodes01'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              github.com/danicodes01
            </a>
          </p>
          <p>
            LinkedIn:{' '}
            <a
              href='https://linkedin.com/in/danicodes01'
              target='_blank'
              rel='noopener noreferrer'
              className={styles.link}
            >
              linkedin.com/in/danicodes01
            </a>
          </p>
        </div>

        <div className={styles.section}>
          <h2>{dict.resume.languages}</h2>
          <p>
            TypeScript, JavaScript, Python, Java, Elixir, C#, CSS, HTML, Apex,
            Sass, Liquid, SQL
          </p>
        </div>

        <div className={styles.section}>
          <h2>{dict.resume.frameworks}</h2>
          <p>
            Next.js, Spring Boot, React, React Native, Angular, Phoenix, Flask,
            Node.js, jQuery, .NET, LangGraph, LangChain, FastAPI, ReAct, RAG,
            Jest, Mocha, Salesforce, Microsoft Dynamics CRM, ExUnit, JUnit,
            Mockito, NUnit, MsTest, Tailwind, Material UI, daisyUI, Bootstrap,
            LangSmith
          </p>
        </div>

        <div className={styles.section}>
          <h2>{dict.resume.tools}</h2>
          <p>
            Postgres, PostgreSQL, MySQL, pgAdmin, DBeaver, AWS, Microsoft Azure,
            Lightning FLows, Salesforce DX, Salesforce CLI, Dataverse
            development tools, Power Apps, REST, Figma, Selenium WebDriver,
            Visual Studio, IntelliJ iDEA, GIt, Bash, Jira, Confluence, FetchXML,
            Problem solving
          </p>
        </div>

        <div className={styles.section}>
          <h2>{dict.resume.workExperience}</h2>

          {/* NEW JOB - Exclaim Recovery */}
          <div className={styles.job}>
            <h3>{dict.resume.job0.title}</h3>
            <p className={styles.duration}>{dict.resume.job0.duration}</p>

            <h4>{dict.resume.job0.role1.title}</h4>
            <ul>
              <li>{dict.resume.job0.role1.bullets[0]}</li>
              <li>{dict.resume.job0.role1.bullets[1]}</li>
              <li>{dict.resume.job0.role1.bullets[2]}</li>
              <li>{dict.resume.job0.role1.bullets[3]}</li>
              <li>{dict.resume.job0.role1.bullets[4]}</li>
              <li>{dict.resume.job0.role1.bullets[5]}</li>
              <li>{dict.resume.job0.role1.bullets[6]}</li>
              <li>{dict.resume.job0.role1.bullets[7]}</li>
              <li>{dict.resume.job0.role1.bullets[8]}</li>
              <li>{dict.resume.job0.role1.bullets[9]}</li>
              <li>{dict.resume.job0.role1.bullets[10]}</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>{dict.resume.job1.title}</h3>
            <p className={styles.duration}>{dict.resume.job1.duration}</p>

            <h4>{dict.resume.job1.role1.title}</h4>
            <ul>
              <li>{dict.resume.job1.role1.bullets[0]}</li>
              <li>{dict.resume.job1.role1.bullets[1]}</li>
              <li>{dict.resume.job1.role1.bullets[2]}</li>
              <li>{dict.resume.job1.role1.bullets[3]}</li>
              <li>{dict.resume.job1.role1.bullets[4]}</li>
              {dict.resume.job1.role1.bullets[5]}

              <li>{dict.resume.job1.role1.bullets[6]}</li>
              <li>{dict.resume.job1.role1.bullets[7]}</li>
              <li>{dict.resume.job1.role1.bullets[8]}</li>
              <li>{dict.resume.job1.role1.bullets[9]}</li>
              <li>{dict.resume.job1.role1.bullets[10]}</li>
              <li>{dict.resume.job1.role1.bullets[11]}</li>
            </ul>

            <h4>{dict.resume.job1.role2.title}</h4>
            <ul>
              <li>{dict.resume.job1.role2.bullets[0]}</li>
              <li>{dict.resume.job1.role2.bullets[1]}</li>
              <li>{dict.resume.job1.role2.bullets[2]}</li>
              <li>{dict.resume.job1.role2.bullets[3]}</li>
              <li>{dict.resume.job1.role2.bullets[4]}</li>
              <li>{dict.resume.job1.role2.bullets[5]}</li>
              <li>{dict.resume.job1.role2.bullets[6]}</li>
              <li>{dict.resume.job1.role2.bullets[7]}</li>
            </ul>
          </div>

          <div className={styles.job}>
            <h3>{dict.resume.job2.title}</h3>
            <p className={styles.duration}>{dict.resume.job2.duration}</p>
            <ul>
              <li>{dict.resume.job2.bullets[0]}</li>
              <li>
              {dict.resume.job2.bullets[1]}
              </li>
              <li>
              {dict.resume.job2.bullets[2]}
              </li>
            </ul>
          </div>

          <div className={styles.job}>
          <h3>{dict.resume.job3.title}</h3>
          <p className={styles.duration}>{dict.resume.job3.duration}</p>
            <ul>
              <li>
              {dict.resume.job3.bullets[0]}
              </li>
              <li>
              {dict.resume.job3.bullets[1]}
              </li>
              <li>
              {dict.resume.job3.bullets[2]}
              </li>
              <li>
              {dict.resume.job3.bullets[3]}
              </li>
            </ul>
          </div>

          <div className={styles.job}>
          <h3>{dict.resume.job4.title}</h3>
          <p className={styles.duration}>{dict.resume.job4.duration}</p>
            <ul>
              <li>
              {dict.resume.job4.bullets[0]}
              </li>
              <li>
              {dict.resume.job4.bullets[1]}
              </li>
              <li>
              {dict.resume.job4.bullets[2]}
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.section}>
        <h2>{dict.resume.projects}</h2>

          <div className={styles.project}>
            <h3>Atlas 360</h3>
            <p>
              <a
                href='https://www.cgi.com/us/en-us/federal/solutions/CGIAtlas360'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                https://www.cgi.com/us/en-us/federal/solutions/CGIAtlas360
              </a>
            </p>
            <p>{dict.resume.projectDescriptions.atlas360}</p>
          </div>

          <div className={styles.project}>
            <h3>DistortNewYork</h3>
            <p>
              <a
                href='https://www.distortnewyork.com/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                https://www.distortnewyork.com/
              </a>
            </p>
            <p>{dict.resume.projectDescriptions.distortNewYork}</p>
          </div>

          <div className={styles.project}>
            <h3>RealWorldNews🌎</h3>
            <p>
              <a
                href='https://www.realworldnews.org/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                https://www.realworldnews.org/
              </a>
            </p>
            <p>{dict.resume.projectDescriptions.realWorldNews}</p>
          </div>

          <div className={styles.project}>
            <h3>ODNU-AI</h3>
            <p>
              <a
                href='https://github.com/danicodes01/odnu'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                https://github.com/danicodes01/odnu
              </a>
            </p>
            <p>{dict.resume.projectDescriptions.odnu}</p>
          </div>

          <div className={styles.project}>
            <h3>Intergalactic Code Academy</h3>
            <p>
              <a
                href='https://ica-app-teal.vercel.app'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                https://ica-app-teal.vercel.app
            </a>
            </p>
            <p>{dict.resume.projectDescriptions.ica}</p>
          </div>

          <div className={styles.project}>
            <h3>ＳＴＡＲＦＬＥＥＴ</h3>
            <p>
              <a
                href='http://starfleetgame.s3-website-us-east-1.amazonaws.com/'
                target='_blank'
                rel='noopener noreferrer'
                className={styles.link}
              >
                http://starfleetgame.s3-website-us-east-1.amazonaws.com/
              </a>
            </p>
            <p>{dict.resume.projectDescriptions.starfleet}</p>
          </div>
        </div>

        <div className={styles.section}>
        <h2>{dict.resume.spokenLanguages}</h2>
          <p>{dict.resume.english}</p>
          <p>{dict.resume.spanish}</p>
        </div>

        <div className={styles.section}>
        <h2>{dict.resume.references}</h2>

          <div className={styles.reference}>
            <p>
              <strong>David T. Maynord</strong>
            </p>
            <p>{dict.resume.referenceTitle.david}</p>
            <p>
              <a href='mailto:david.maynor@cgi.com' className={styles.link}>
                david.maynor@cgi.com
              </a>
            </p>
          </div>

          <div className={styles.reference}>
            <p>
              <strong>Dana Richards</strong>
            </p>
            <p>
              <a href='mailto:drichards@ea.com' className={styles.link}>
                drichards@ea.com
              </a>
            </p>
            <p>831 239 0695</p>
          </div>

          <div className={styles.reference}>
            <p>
              <strong>Yamil Castro</strong>
            </p>
            <p>
              <a href='mailto:ycastroa@gmu.edu' className={styles.link}>
                ycastroa@gmu.edu
              </a>
            </p>
            <p>571 245 6429</p>
          </div>
        </div>
      </div>
    </div>
  );
}