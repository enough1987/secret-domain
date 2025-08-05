import { configureStore } from '@reduxjs/toolkit'
import { todoApi } from './services/api/todoApi'
import { photoApi } from './services/api/photoApi'
import { checkHealthApi } from './services/api/checkHealthApi'

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
    [checkHealthApi.reducerPath]: checkHealthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(todoApi.middleware)
      .concat(photoApi.middleware)
      .concat(checkHealthApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch