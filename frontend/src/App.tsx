import { Outlet } from 'react-router'
import Menu from './components/menu/Menu'
import styles from './app.module.scss'

function App() {
  return (
    <div className={styles.appRoot}>
      <Menu />
      <Outlet />
    </div>
  )
}

export default App
