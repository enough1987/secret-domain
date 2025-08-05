import React from 'react'
import { selectCompletedFromTodos, useGetTodosQuery } from '../../../services/api/todoApi'
import Todo from '../todo/Todo'
import { LIMIT_TODO } from '../../../services/models'
import styles from './Todos-completed.module.scss'

const TodosCompleted: React.FC = () => {
  const { data, error, isLoading } = useGetTodosQuery(LIMIT_TODO, {
    selectFromResult: selectCompletedFromTodos,
  })

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading todos.</div>
  }

  return (
    <ul className={styles.todoList}>
      {data?.map(todo => (
        <Todo key={todo.id} item={todo} />
      ))}
    </ul>
  )
}

export default TodosCompleted