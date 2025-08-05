import React from 'react'
import packageJson from '../../../package.json'
import { useCheckHealthQuery } from '../../services/api/checkHealthApi'
import styles from './home.module.scss'

const buildVersion = import.meta.env.VITE_BUILD_VERSION

const Home: React.FC = () => {
  const { data: healthData } = useCheckHealthQuery();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Home</h1>
      <p className={styles.text}>Welcome to the Home page!</p>
      <p className={styles.text}>Version {packageJson.version}</p>
      <p className={styles.text}>API Status: {healthData?.status ? 'Healthy' : 'Unhealthy'}</p>
      <p className={styles.text}>Health DB Check: {healthData?.db ? 'Healthy' : 'Unhealthy'}</p>
      <p className={styles.text}>Health Cache Check: {healthData?.cache ? 'Healthy' : 'Unhealthy'}</p>
      <p className={styles.text}>API Version: {healthData?.version || 'unknown'}</p>
      {buildVersion && (
        <p className={styles.text}>Build Version: {buildVersion}</p>
      )}
    </div>
  )
}

export default Home
