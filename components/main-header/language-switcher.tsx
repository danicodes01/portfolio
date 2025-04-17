'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classes from './nav-link.module.css';
import styles from './language-switcher.module.css';

const languages = [
  { code: 'en', name: 'EN' },
  { code: 'es', name: 'ES' }
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  
  if (!pathname) return null;
  
  const currentLang = pathname.split('/')[1];
  const restOfPath = pathname.split('/').slice(2).join('/');
  
  return (
    <div className={styles.switcher}>
      {languages.map((lang) => {
        const newPath = lang.code === currentLang 
          ? pathname 
          : `/${lang.code}${restOfPath ? `/${restOfPath}` : ''}`;
        
        return (
          <Link 
            href={newPath} 
            key={lang.code}
            className={lang.code === currentLang ? classes.active : undefined}
          >
            {lang.name}
          </Link>
        );
      })}
    </div>
  );
}