import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Daniel Knowles | Resume',
  description: 'Resume of Daniel Knowles, Software Engineer',
};

export default function Resume() {
  return (
    <div className={styles.resumePage}>
      <div className={styles.resumeContent}>
        <h1>Daniel Knowles</h1>
        <p className={styles.jobTitle}>Software Engineer</p>
        <div className={styles.contact}>
          <p>Email: <a href="mailto:danielgene.dev@gmail.com" className={styles.link}>danielgene.dev@gmail.com</a></p>
          <p>Phone: <a href="tel:7188736651" className={styles.link}>(718) 873-6651</a></p>
          <p>Portfolio: <a href="https://danicodes.org" target="_blank" rel="noopener noreferrer" className={styles.link}>danicodes.org</a></p>
          <p>GitHub: <a href="https://github.com/danicodes01" target="_blank" rel="noopener noreferrer" className={styles.link}>github.com/danicodes01</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/danicodes01" target="_blank" rel="noopener noreferrer" className={styles.link}>linkedin.com/in/danicodes01</a></p>
        </div>
        
        <div className={styles.section}>
          <h2>LANGUAGES</h2>
          <p>TypeScript, JavaScript, Python, Java, C#, CSS, HTML, Apex, Sass, Liquid, SQL</p>
        </div>
        
        <div className={styles.section}>
          <h2>FRAMEWORKS/ LIBRARIES</h2>
          <p>Next.js, Spring Boot, React, React Native, Angular, Flask, Node.js, jQuery, .NET, LangGraph, LangChain, FastAPI, ReAct, RAG, Jest, Mocha, Salesforce, Microsoft Dynamics CRM, JUnit, Mockito, NUnit, MsTest, Tailwind, Material UI, daisyUI, Bootstrap, LangSmith</p>
        </div>
        
        <div className={styles.section}>
          <h2>TOOLS</h2>
          <p>Postgres, PostgreSQL, MySQL, pgAdmin, DBeaver, AWS, Microsoft Azure, Lightning FLows, Salesforce DX, Salesforce CLI, Dataverse development tools, Power Apps, REST, Figma, Selenium WebDriver, Visual Studio, IntelliJ iDEA, GIt, Bash, Jira, Confluence, FetchXML, Problem solving</p>
        </div>
        
        <div className={styles.section}>
          <h2>WORK EXPERIENCE</h2>
          
          <div className={styles.job}>
            <h3>CGI FEDERAL, Remote — CONSULTANT</h3>
            <p className={styles.duration}>June 2022 - December 2023</p>
            
            <h4>FSG, Atlas— CONSULTANT (Aug 2022 - December 2023)</h4>
            <ul>
              <li>Actively engaged developer on an Agile Scrum team for a US government contract awarded to CGI.</li>
              <li>Developed a system that successfully supports the processing of over 15 million U.S. passports and over 4 million visas in 70 countries each year.</li>
              <li>Streamlined case management by optimizing a React front-end that interfaced with Microsoft Dynamics 365, utilizing CRM case data and a Python-driven API for reference data access.</li>
              <li>Leveraged machine learning with Python&apos;s FastText library to enhance response efficiency by 40%, significantly improving caseworkers&apos; ability to manage and respond to U.S. visa applications. Expanded reference data and added training examples to enable FastText to classify case types based on nuanced text inputs. Implemented a user feedback loop to refine model accuracy, allowing for continuous learning and adaptation in predictive text classification.</li>
              <li>Refactored the existing Salesforce system to Microsoft Dynamics for the US government, ensuring compliance with FedRAMP High security standards, providing advanced encryption and secure access control.</li>
              <li>Streamlined development environment setup by scripting the import of certificates, installation of Azure CLI, Docker, and conducting post-installation configuration and testing.</li>
              <li>Documented comprehensive processes in Confluence, covering deployment lifecycles, technical notes, tool usage guidelines, and high-level documentation for various applications and workflows.</li>
              <li>Conducted infrastructure tasks, including version controlling node and Flask libraries, Docker images, manipulating Kubernetes resources, and troubleshooting Jenkins pipelines.</li>
              <li>Authored comprehensive help documentation and supervised end-user testing, ensuring a user-friendly experience.</li>
              <li>Created and modified custom Dynamics 365 tables, establishing attributes, data structures, relationships, entity forms, views, business rules, and workflows.</li>
              <li>Managed security roles, updating team privileges and controlling access to data resources.</li>
              <li>Implemented payment configurations, dynamic receipts, and visa instructions for various countries. Created constants via code snippets to ensure seamless translations for multiple languages.</li>
            </ul>
            
            <h4>ESG, CAST— CONSULTANT (June 2022 – Aug 2022)</h4>
            <ul>
              <li>Collaborated within a small team to spearhead the development of an internal application, crafted from inception. Engaged in a two-month intensive involvement, contributing expertise across diverse facets, including visual design, REST API design and implementation, data modeling, and front-end development.</li>
              <li>Acquired proficiency in Java on-the-fly, demonstrating adaptability to architect and implement a robust REST API using the Spring Boot framework.</li>
              <li>Implemented Object-Relational Mapping with JPA to optimize data management and enhance the application&apos;s efficiency.</li>
              <li>Developed comprehensive unit tests using Mockito and JUnit to rigorously evaluate the business logic embedded within the Service layer. Established test classes and leveraged InjectMocks for object creation, ensuring minimal dependency interference and fostering a loosely coupled architecture conducive to effective testing.</li>
              <li>Utilized Swagger for the generation of detailed REST API documentation, enhancing the project&apos;s transparency and accessibility.</li>
              <li>Managed dependencies through a central Maven repository, ensuring seamless updates and acquisition of new resources.</li>
              <li>Developed reusable Angular components using TypeScript and interfaces, fostering a robust and strongly typed programming environment.</li>
              <li>Collaborated seamlessly with Material UI to design custom tables and implement styles, enhancing the user interface for an optimal user experience.</li>
            </ul>
          </div>
          
          <div className={styles.job}>
            <h3>OPERATION SPARK, Remote — TEACHING ASSISTANT</h3>
            <p className={styles.duration}>June 2021 – July 2022</p>
            <ul>
              <li>Assisted students studying Software Development.</li>
              <li>Mentored and tutored individual students struggling to understand lecture objectives.</li>
              <li>Instructed students of various backgrounds and learning styles by employing a variety of instructional resources.</li>
            </ul>
          </div>
          
          <div className={styles.job}>
            <h3>SELF EMPLOYED, Remote — DRAFTSMAN</h3>
            <p className={styles.duration}>January 2017 – February 2022</p>
            <ul>
              <li>Collaborated with clients to design custom home layouts tailored to their needs.</li>
              <li>Created detailed plans for submission to engineers and county officials.</li>
              <li>Utilized AutoCAD to produce precise architectural drawings, including 3D renderings and elevation views.</li>
              <li>Ensured all designs met local regulations and structural requirements.</li>
            </ul>
          </div>
          
          <div className={styles.job}>
            <h3>RAINBOW GROCERY, San Francisco, CA — WORKER / OWNER</h3>
            <p className={styles.duration}>January 2010 – July 2016</p>
            <ul>
              <li>Collaborated with local farmers and vendors to maintain a consistent supply of fresh produce.</li>
              <li>Participated in department and store-wide meetings, discussing store policies and ensuring the mission statement was upheld.</li>
              <li>Took on full ownership responsibilities in a worker-owned cooperative, contributing to the efficient operation of the grocery store.</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2>PROJECTS</h2>
          
          <div className={styles.project}>
            <h3>Atlas 360</h3>
            <p><a href="https://www.cgi.com/us/en-us/federal/solutions/CGIAtlas360" target="_blank" rel="noopener noreferrer" className={styles.link}>https://www.cgi.com/us/en-us/federal/solutions/CGIAtlas360</a></p>
            <p>A comprehensive consular services solution used by the U.S. Department of State to process over 15 million passports and 4 million visas annually. Atlas360 provides an end-to-end view of the visa application process, enhancing security and flexibility while combating fraud. As part of the development team, I contributed to optimizing the system&apos;s performance, streamlining case management, and delivering a robust, user-friendly platform.</p>
          </div>
          
          <div className={styles.project}>
            <h3>DistortNewYork</h3>
            <p><a href="https://www.distortnewyork.com/" target="_blank" rel="noopener noreferrer" className={styles.link}>https://www.distortnewyork.com/</a></p>
            <p>Your live event aid in New York. Automatically aggregating events from an array of venues.</p>
          </div>
          
          <div className={styles.project}>
            <h3>RealWorldNews🌎</h3>
            <p><a href="https://www.realworldnews.org/" target="_blank" rel="noopener noreferrer" className={styles.link}>https://www.realworldnews.org/</a></p>
            <p>Real World News is an innovative app that aggregates news from various sources like Al Jazeera, BBC, Democracy Now, and NPR, bringing them all into one searchable place.</p>
          </div>
          
          <div className={styles.project}>
            <h3>ODNU-AI</h3>
            <p><a href="https://github.com/danicodes01/odnu" target="_blank" rel="noopener noreferrer" className={styles.link}>https://github.com/danicodes01/odnu</a></p>
            <p>ODNU provides daily NASA insights, with a Space-Bot chat powered by a fine-tuned LLM, offering users engaging, space-focused updates and interactions.</p>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2>SPOKEN LANGUAGES</h2>
          <p>English - Native</p>
          <p>Spanish - Fluent</p>
        </div>
        
        <div className={styles.section}>
          <h2>REFERENCES</h2>
          
          <div className={styles.reference}>
            <p><strong>David T. Maynord</strong></p>
            <p>Director Consulting, CGI</p>
            <p><a href="mailto:david.maynor@cgi.com" className={styles.link}>david.maynor@cgi.com</a></p>
          </div>
          
          <div className={styles.reference}>
            <p><strong>Dana Richards</strong></p>
            <p><a href="mailto:drichards@ea.com" className={styles.link}>drichards@ea.com</a></p>
            <p>831 239 0695</p>
          </div>
          
          <div className={styles.reference}>
            <p><strong>Yamil Castro</strong></p>
            <p><a href="mailto:ycastroa@gmu.edu" className={styles.link}>ycastroa@gmu.edu</a></p>
            <p>571 245 6429</p>
          </div>
        </div>
      </div>
    </div>
  );
}