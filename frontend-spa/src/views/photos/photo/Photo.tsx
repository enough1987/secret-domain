import React from 'react'
import type { IPhoto } from '../../../services/models.ts'
import DEFAULT_URL from '../../../assets/no-image.png'
import styles from './Photo.module.scss'

interface PhotoProps {
  item: IPhoto
}

const Photo: React.FC<PhotoProps> = ({ item }) => (
  <div className={styles.root}>
    <div className={styles.imageContainer}>
      <img
        src={item?.url || DEFAULT_URL}
        alt={item?.title || 'No title'}
        className={styles.image}
        loading="lazy"
        onError={e => (e.currentTarget.src = DEFAULT_URL)}
      />
    </div>
    <span className={styles.title}>{item?.title || 'No title'}</span>
  </div>
)

export default Photo