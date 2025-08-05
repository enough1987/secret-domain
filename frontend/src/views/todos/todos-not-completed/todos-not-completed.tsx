import React from 'react'
import { selectNotCompletedFromTodos, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../../../services/api/todoApi'
import Todo from '../todo/Todo'
import { LIMIT_TODO, type ITodo } from '../../../services/models'
import styles from './todos-not-completed.module.scss'

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
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading todos.</div>
  }

  return (
    <ul className={styles.todoList}>
            {data?.map(todo => (
              <Todo key={todo.id} item={todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
    </ul>
  )
}

export default TodosNotCompleted