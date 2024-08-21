import classes from './main-header.module.css'
import NavLink from "./nav-link";
export default function MainHeader() {

  return (
    <header className={classes.header}>
      <NavLink href='/'>
      <p><span className={classes.highlight}>Daniel Knowles</span></p>
      </NavLink>
      
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink href='/contact'>contact</NavLink>
          </li>
          <li>
            {/* <NavLink href='/trips/share'>share</NavLink> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}