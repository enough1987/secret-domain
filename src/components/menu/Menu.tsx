import React from 'react'
import { NavLink } from 'react-router'
import { MenuRoutes } from '../../services/models'

const Menu: React.FC = () => (
  <nav className="bg-blue-300 p-4">
    <ul className="flex space-x-6 text-white font-semibold">
      {MenuRoutes.map(item => (
        <NavLink
          key={item.to}
          className="hover:underline cursor-pointer"
          to={item.to}
        >
          {item.title}
        </NavLink>
      ))}
    </ul>
  </nav>
)

export default Menu