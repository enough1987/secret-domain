import React, { useState } from 'react'
import { Priority, type ITodo } from '../../../services/models'
import { todoApi } from '../../../services/api/todoApi'
import TodosNotCompleted from '../todos-not-completed/Todos-not-completed'
import styles from './Todo-add.module.scss'

const defaultTodo: Omit<ITodo, 'id' | 'created'> = {
  title: '',
  priority: Priority.MEDIUM,
  completed: false,
}

const TodoAdd: React.FC = () => {
  const [todo, setTodo] = useState<Omit<ITodo, 'id' | 'created'>>(defaultTodo)
  const [addTodo, { isLoading }] = todoApi.useAddTodoMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo.title.trim()) return
    await addTodo(todo).unwrap();
    setTodo(defaultTodo)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add new todo..."
          value={todo.title}
          onChange={e => setTodo(prev => ({ ...prev, title: e.target.value }))}
          disabled={isLoading}
        />
        <select
          className={styles.select}
          value={todo.priority}
          onChange={e => setTodo(prev => ({ ...prev, priority: e.target.value as Priority }))}
          disabled={isLoading}
        >
          {[Priority.LOW, Priority.MEDIUM, Priority.HIGH].map(p => (
            <option key={p} value={p}>{p?.charAt(0)?.toUpperCase() + p?.slice(1)}</option>
          ))}
        </select>
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          Add
        </button>
      </form>
      <TodosNotCompleted />
    </>
  )
}

export default TodoAdd