import { Outlet } from 'react-router'
import './App.css'
import Menu from './components/menu/Menu'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Menu />
      <Outlet />
    </div>
  )
}

export default App
