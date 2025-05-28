import classes from './main-header.module.css';
import NavLink from './nav-link';
import LanguageDropdown from './language-dropdown';

type HeaderProps = {
  lang?: string;
  dict?: {
    header?: {
      name: string;
      contact: string;
    };
  };
};

export default function MainHeader({ lang, dict }: HeaderProps) {
  const currentLang = lang || 'en';

  const headerText = dict?.header || {
    name: 'Daniel Knowles',
    contact: 'contact',
  };

  return (
    <header className={classes.header}>
      <NavLink href={`/${currentLang}`}>
        <p>
          <span className={classes.highlight}>{headerText.name}</span>
        </p>
      </NavLink>

      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href={`/${currentLang}/contact`}>
              {headerText.contact}
            </NavLink>
          </li>
          <li>
            <LanguageDropdown currentLang={currentLang} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
