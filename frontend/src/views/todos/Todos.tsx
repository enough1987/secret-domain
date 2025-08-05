import React from 'react'
import { useParams } from 'react-router'
import { TodosTypes } from '../../services/models';
import TodosCompleted from './todos-completed/Todos-completed';
import TodosNotCompleted from './todos-not-completed/Todos-not-completed';
import TodosAdd from './todo-add/Todo-add';
import styles from './Todos.module.scss'

const Todos: React.FC = () => {
  const { type } = useParams<{ type: string }>()

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Todos</h1>
      <div className={styles.section}>
        <h2 className={styles.subtitle}>
          {type === TodosTypes.COMLETED && 'Completed'}
          {type === TodosTypes.NOT_COMLETED && 'Not Completed'}
          {(type !== TodosTypes.COMLETED && type !== TodosTypes.NOT_COMLETED) && 'Add Todos'}
        </h2>
        <div className={styles.info}></div>
        <ul className={styles.todoList}>
          {type === TodosTypes.COMLETED && <TodosCompleted />}
          {type === TodosTypes.NOT_COMLETED && <TodosNotCompleted />}
          {(type !== TodosTypes.COMLETED && type !== TodosTypes.NOT_COMLETED) && <TodosAdd />}
        </ul>
      </div>
    </div>
  )
}

export default Todos