import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type IHealth, type IPhoto, type ITodo } from './models'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  tagTypes: ['todos', 'photos', 'health'],
  endpoints: (builder) => ({
    checkHealth: builder.query<IHealth, void>({
      query: () => `/`,
    }),
    getTodos: builder.query<ITodo[], number | void>({
      // Accepts a limit parameter (default 10 if not provided)
      query: (limit = 10) => `/todos?_limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'todos' as const, id })),
              { type: 'todos', id: 'LIST' },
            ]
          : [{ type: 'todos', id: 'LIST' }],
      transformResponse: (response: ITodo[]) =>
        response.slice().sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()),
      keepUnusedDataFor: 30, // cache unused data for 30 seconds
    }),
    addTodo: builder.mutation<ITodo, Omit<ITodo, 'id' | 'created'>>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: {...todo, created: new Date().toISOString() },
      }),
      invalidatesTags: (result) => result ? [{ type: 'todos', id: 'LIST' }] : []
    }),
    updateTodo: builder.mutation<ITodo, Partial<ITodo> & Pick<ITodo, 'id'>>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: (result, _error, { id }) => result ? [{ type: 'todos', id }] : [],
    }),
    deleteTodo: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, _error, id) => result ? [{ type: 'todos', id }] : [],
    }),

    getPhotos: builder.query<IPhoto[], number | void>({
      // Accepts a limit parameter (default 10 if not provided)
      query: (limit = 10) => `/photos?_limit=${limit}`,
      providesTags: ['photos'],
      keepUnusedDataFor: 60*60, // cache unused data for 60*60 seconds
    }),
  }),
})

type ISelectFromResult<T> = {
  data?: T
  isLoading: boolean
  error?: unknown       
}

export const selectCompletedFromTodos = (
  { data, ...rest }: ISelectFromResult<ITodo[]>
) => ({
  data: data?.filter(todo => todo.completed) || [],
  ...rest,
});

export const selectNotCompletedFromTodos = (
  { data, ...rest }: ISelectFromResult<ITodo[]>
) => ({
  data: data?.filter(todo => !todo.completed) || [],
  ...rest,
});

export const { 
  useGetTodosQuery, 
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,

  useCheckHealthQuery,

  useGetPhotosQuery
} = api