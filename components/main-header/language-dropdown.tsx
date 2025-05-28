'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import classes from './language-dropdown.module.css';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

interface LanguageDropdownProps {
  currentLang: string;
}

export default function LanguageDropdown({ currentLang }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find(lang => lang.code === currentLang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

const handleLanguageChange = (langCode: string) => {
  // Always use the pathname to get the current language, not the prop
  const segments = pathname.split('/').filter(Boolean); // removes empty strings
  const currentPathLang = segments[0]; // first segment is always the language
  const remainingPath = segments.slice(1); // everything after the language
  
  // Construct new path
  const newPath = `/${langCode}${remainingPath.length > 0 ? '/' + remainingPath.join('/') : ''}`;
  
  console.log('Navigating from', pathname, 'to', newPath);
  
  router.push(newPath);
  setIsOpen(false);
};

  return (
    <div className={classes.dropdown} ref={dropdownRef}>
      <button
        className={classes.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={classes.currentLang}>
          {currentLanguage.code.toUpperCase()}
        </span>
        <span className={classes.arrow}>▼</span>
      </button>

      {isOpen && (
        <div className={classes.menu} role="listbox">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${classes.option} ${
                language.code === currentLang ? classes.active : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
              role="option"
              aria-selected={language.code === currentLang}
            >
              <span className={classes.flag}>{language.flag}</span>
              <span className={classes.label}>{language.label}</span>
              <span className={classes.code}>{language.code.toUpperCase()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}