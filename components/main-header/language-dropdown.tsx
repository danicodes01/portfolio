'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import classes from './language-dropdown.module.css';

interface Language {
  code: string;
  label: string;
  flag: string;
}

const mainLanguages: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
];

const additionalLanguages: Language[] = [
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
];

interface LanguageDropdownProps {
  currentLang: string;
}

export default function LanguageDropdown({ currentLang }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const allLanguages = [...mainLanguages, ...additionalLanguages];
  const currentLanguage = allLanguages.find(lang => lang.code === currentLang) || mainLanguages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowMore(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split('/').filter(Boolean);
    const remainingPath = segments.slice(1);
    const newPath = `/${langCode}${remainingPath.length > 0 ? '/' + remainingPath.join('/') : ''}`;
    
    router.push(newPath);
    setIsOpen(false);
    setShowMore(false);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMore(!showMore);
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
          {!showMore ? (
            <>
              {mainLanguages.map((language) => (
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
              <button
                className={`${classes.option} ${classes.moreOption}`}
                onClick={handleMoreClick}
                role="button"
                aria-haspopup="true"
                aria-expanded={showMore}
              >
                <span className={classes.flag}>🌐</span>
                <span className={classes.label}>...</span>
                <span className={`${classes.arrow} ${showMore ? classes.arrowUp : ''}`}>▶</span>
              </button>
            </>
          ) : (
            [...mainLanguages, ...additionalLanguages].map((language) => (
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
            ))
          )}
        </div>
      )}
    </div>
  );
}