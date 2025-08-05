import React from 'react'
import { useGetPhotosQuery } from '../../services/api/photoApi'
import Photo from './photo/Photo'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer";
import styles from './photos.module.scss'

const PHOTOS_PER_ROW = 4

const Photos: React.FC = () => {
  const { data, error, isLoading } = useGetPhotosQuery(100)

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading photos.</div>
  }

  const photos = data || []
  const rowCount = Math.ceil(photos.length / PHOTOS_PER_ROW)

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Photos</h1>
      <div className={styles.gridContainer}>
        <AutoSizer>
          {({ height, width }: { height: number; width: number }) => (
            <Grid
              columnCount={PHOTOS_PER_ROW}
              columnWidth={width / PHOTOS_PER_ROW}
              height={height}
              rowCount={rowCount}
              rowHeight={height / 3}
              width={width}
            >
              {({ columnIndex, rowIndex, style }) => {
                const photoIndex = rowIndex * PHOTOS_PER_ROW + columnIndex
                const photo = photos[photoIndex]
                if (!photo) return null
                return (
                  <div style={style}>
                    <Photo key={photo.id} item={photo} />
                  </div>
                )
              }}
            </Grid>
          )}
        </AutoSizer>
      </div>
    </div>
  )
}

export default Photos