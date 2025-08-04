import React from 'react'
import Link from 'next/link'
import { MenuRoutes } from '@/api/models'
import styles from './menu.module.scss'

const Menu: React.FC = () => (
  <nav className={styles.menuNav}>
    <ul className={styles.menuList}>
      {MenuRoutes.map(item => (
        <li key={item.to}>
          {item.to.startsWith('http') ? (
            <a
              href={item.to}
              className={styles.menuLink}
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          ) : (
            <Link href={item.to} className={styles.menuLink}>
              {item.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
)

export default Menu
