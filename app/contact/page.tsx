import Link from "next/link";
import classes from "./page.module.css";

export default function ContactPage() {
  return (
    <div className={classes.contact}>
      <header className={classes.header}>
        <h1>Contact Daniel Knowles</h1>
        <p>
          If you have any inquiries about our apps, or if youre looking for engineering or development support, I’d love to connect:
        </p>
      </header>
      <main className={classes.info}>
        <p>Email:{" "}
          <a href="mailto:danielgene.dev@gmail.com" className={classes.link}>
            danielgene.dev@gmail.com
          </a>
        </p>
        <p>LinkedIn:{" "}
          <Link href="https://www.linkedin.com/in/danicodes01/" className={classes.link}>
            connect with me on LinkedIn
          </Link>
        </p>
        <p>GitHub:{" "}
          <Link href="https://github.com/danicodes01" className={classes.link}>
            check out my GitHub
          </Link>
        </p>
      </main>
    </div>
  );
}
