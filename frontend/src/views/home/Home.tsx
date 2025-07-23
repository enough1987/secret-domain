import React from 'react'
import packageJson from '../../../package.json'
import { useCheckHealthQuery } from '../../services/api';

const buildVersion = import.meta.env.VITE_BUILD_VERSION

const Home: React.FC = () => {
  const { data: healthData } = useCheckHealthQuery();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p className="text-gray-700">Welcome to the Home page!</p>
      <p className="text-gray-700">Version {packageJson.version}</p>
      {
        healthData && (
          <p className="text-gray-700">Health DB Check: {healthData?.db ? 'Healthy' : 'Unhealthy'}</p>
        )
      }
      {
        buildVersion && (
          <p className="text-gray-700">Build Version: {buildVersion}</p>
        )
      }
    </div>
  )
}

export default Home
