import React, { useState } from 'react'
import type { ITodo } from '../../../services/models'
import { FaTrash, FaEdit } from 'react-icons/fa'
import styles from './todo.module.scss'

interface ITodoProps {
  item: ITodo | null,
  onUpdate?: (todo: ITodo) => void,
  onDelete?: (todo: ITodo) => void,     
}

const Todo: React.FC<ITodoProps> = ({ item, onUpdate, onDelete }) => {
  const [todo, setTodo] = useState<ITodo | null>(item || null)
  const [hovered, setHovered] = useState(false)

  const onChange = () => {
    setTodo(prev => prev ? { ...prev, completed: !prev.completed } : null)
  }

  return (
    <li
      key={todo?.id}
      className={styles.todoItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo?.completed}
        onChange={onChange}
        disabled={!todo || !(onUpdate || onDelete)}
      />
      {hovered && onUpdate ? (
        <input
          className={styles.input}
          value={todo?.title}
          onChange={e => setTodo(prev => prev ? { ...prev, title: e.target.value } : null)}
        />
      ) : (
        <span
          className={`${styles.title} ${todo?.completed ? styles.completed : ''}`}
        >
          {todo?.title}
        </span>
      )}
      <button
        className={`${styles.actionBtn} ${hovered && onUpdate ? styles.actionBtnVisible : ''}`}
        title="Update"
        type="button"
        onClick={() => onUpdate?.(todo as ITodo)}
        tabIndex={-1}
        aria-hidden={!hovered || !onUpdate}
      >
        <FaEdit />
      </button>
      <button
        className={`${styles.actionBtnDelete} ${hovered && onDelete ? styles.actionBtnVisible : ''}`}
        title="Delete"
        type="button"
        onClick={() => onDelete?.(todo as ITodo)}
        tabIndex={-1}
        aria-hidden={!hovered || !onDelete}
      >
        <FaTrash />
      </button>
    </li>
  )
}

export default Todo