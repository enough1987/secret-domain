import React from 'react'
import type { IPhoto } from '../../services/models'
import DEFAULT_URL from '../../assets/photo.png'

interface PhotoProps {
  item: IPhoto
}

const Photo: React.FC<PhotoProps> = ({ item }) => (
  <div className="bg-white rounded shadow p-2 flex flex-col items-center">
    <img
      src={item?.url || DEFAULT_URL}
      alt={item?.title || 'No title'}
      className="rounded mb-2 w-40 h-40 object-cover"
      onError={e => (e.currentTarget.src = DEFAULT_URL)}
    />
    <span className="text-xs text-gray-700 text-center">{item?.title || 'No title'}</span>
  </div>
)

export default Photo