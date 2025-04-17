import Link from 'next/link'
 
export default function ProjectNotFound() {
  return (
    <div className='not-found'>
      <h2>Project not found</h2>
      <p>this Project was not found ...</p>
      <Link href="/">go back to Projects</Link>
    </div>
  )
}