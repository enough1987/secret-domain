import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LIMIT_TODO, type ISelectFromResult, type ITodo } from '../models'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_URL}/api` }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos: builder.query<ITodo[], number | void>({
      query: (limit = 10) => `/todos?limit=${limit}`,
      providesTags: (result, _error, limit) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'todos' as const, id })),
              { type: 'todos', id: `LIST-${limit}` },
            ]
          : [{ type: 'todos', id: `LIST-${limit}` }],
      transformResponse: (response: ITodo[]) =>
        response?.slice().sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()) || [],
      keepUnusedDataFor: 30,
    }),
    addTodo: builder.mutation<ITodo, Omit<ITodo, 'id' | 'created'>>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: { ...todo, created: new Date().toISOString() },
      }),
      invalidatesTags: () =>
        [{ type: 'todos', id: `LIST-${LIMIT_TODO}` }],
    }),
    updateTodo: builder.mutation<ITodo, Partial<ITodo> & Pick<ITodo, 'id'>>({
      query: (todo) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: (_result, _error, todo) =>
        [{ type: 'todos', id: `LIST-${LIMIT_TODO}` }, { type: 'todos', id: todo.id }],
    }),
    deleteTodo: builder.mutation<number, number>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) =>
        [{ type: 'todos', id: `LIST-${LIMIT_TODO}` }, { type: 'todos', id }],
    }),
  }),
})

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
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi