import React from 'react'
import { useGetPhotosQuery } from '../../services/api'
import Photo from './Photo'

const Photos: React.FC = () => {
  const { data, error, isLoading } = useGetPhotosQuery(12)

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading photos.</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Photos</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.map(photo => (
          <Photo key={photo.id} item={photo} />
        ))}
      </div>
    </div>
  )
}

export default Photos