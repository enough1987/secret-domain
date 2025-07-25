import React from 'react'
import { useGetPhotosQuery } from '../../services/api'
import Photo from './Photo'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from "react-virtualized-auto-sizer";

const PHOTOS_PER_ROW = 4

const Photos: React.FC = () => {
  const { data, error, isLoading } = useGetPhotosQuery(100)

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading photos.</div>
  }

  const photos = data || []
  const rowCount = Math.ceil(photos.length / PHOTOS_PER_ROW)

  return (
    <div className="p-8 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Photos</h1>
      <div style={{ flex: 1 }}>
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