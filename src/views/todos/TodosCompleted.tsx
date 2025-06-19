import React from 'react'
import { selectCompletedFromTodos, useGetTodosQuery } from '../../services/api'
import Todo from './Todo'

const TodosCompleted: React.FC = () => {
  const { data, error, isLoading } = useGetTodosQuery(100, {
    selectFromResult: selectCompletedFromTodos,
  })

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading todos.</div>
  }

  return (
    <ul className="space-y-2 w-full">
          {data?.map(todo => (
            <Todo key={todo.id} item={todo} />
          ))}
    </ul>
  )
}

export default TodosCompleted