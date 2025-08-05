import React from 'react'
import { NavLink } from 'react-router'
import { MenuRoutes } from '../../services/models'
import styles from './menu.module.scss'

const Menu: React.FC = () => (
  <nav className={styles.menuNav}>
    <ul className={styles.menuList}>
      {MenuRoutes.map(item => (
        item.to.startsWith('http') ? (
            <li key={item.to}>
              <a
                href={item.to}
                className={styles.menuLink}
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </li>
          ) : (
            <li key={item.to}>
              <NavLink
                className={styles.menuLink}
                to={item.to}
              >
                {item.title}
              </NavLink>
            </li>
          )
      ))}
  </ul>
  </nav>
)

export default Menu