import React from 'react'
import { selectNotCompletedFromTodos, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../services/api/todoApi'
import Todo from './Todo'
import { LIMIT_TODO, type ITodo } from '../../services/models'

const TodosNotCompleted: React.FC = () => {
  const { data, error, isLoading } = useGetTodosQuery(LIMIT_TODO, {
    selectFromResult: selectNotCompletedFromTodos,
  });
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()


  const onUpdate = (todo: ITodo) => {
      updateTodo(todo);
  }
  
  const onDelete = (todo: ITodo) => {
      deleteTodo(todo.id)
  }

  if (isLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading todos.</div>
  }

  return (
    <ul className="space-y-2 w-full">
            {data?.map(todo => (
              <Todo key={todo.id} item={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
    </ul>
  )
}

export default TodosNotCompleted