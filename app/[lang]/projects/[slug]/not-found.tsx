import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project not found',
  robots: { index: false, follow: false },
};

export default function ProjectNotFound() {
  return (
    <div className='not-found'>
      <h2>Project not found</h2>
      <p>this Project was not found ...</p>
      <Link href="/">go back to Projects</Link>
    </div>
  );
}
