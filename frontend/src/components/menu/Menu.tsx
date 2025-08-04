import React from 'react'
import { NavLink } from 'react-router'
import { MenuRoutes } from '../../services/models'

const Menu: React.FC = () => (
  <nav className="bg-blue-300 p-4">
    <ul>
      {MenuRoutes.map(item => (
        item.to.startsWith('http') ? (
            <li key={item.to}>
              <a
                href={item.to}
                className="hover:underline cursor-pointer"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </li>
          ) : (
            <li key={item.to}>
              <NavLink
                className="hover:underline cursor-pointer"
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