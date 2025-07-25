import React from 'react'
import { selectCompletedFromTodos, useGetTodosQuery } from '../../services/api/todoApi'
import Todo from './Todo'
import { LIMIT_TODO } from '../../services/models'

const TodosCompleted: React.FC = () => {
  const { data, error, isLoading } = useGetTodosQuery(LIMIT_TODO, {
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