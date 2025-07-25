import React from 'react'
import type { IPhoto } from '../../services/models'
import DEFAULT_URL from '../../assets/photo.png'

interface PhotoProps {
  item: IPhoto
}

const Photo: React.FC<PhotoProps> = ({ item }) => (
  <div className="bg-white rounded shadow p-2 flex flex-col items-center h-full">
    <div className="flex-grow w-full flex items-center justify-center">
      <img
        src={item?.url || DEFAULT_URL}
        alt={item?.title || 'No title'}
        className="rounded w-full object-cover"
        loading="lazy"
        onError={e => (e.currentTarget.src = DEFAULT_URL)}
      />
    </div>
    <span className="text-xs text-gray-700 text-center w-full">{item?.title || 'No title'}</span>
  </div>
)

export default Photo