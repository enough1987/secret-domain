import React, { useState } from 'react'
import { Priority, type ITodo } from '../../services/models'
import { api } from '../../services/api'
import TodosNotCompleted from './TodosNotCompleted'

const defaultTodo: Omit<ITodo, 'id' | 'created'> = {
  title: '',
  priority: Priority.MEDIUM,
  completed: false,
}

const TodoAdd: React.FC = () => {
  const [todo, setTodo] = useState<Omit<ITodo, 'id' | 'created'>>(defaultTodo)
  const [addTodo, { isLoading }] = api.useAddTodoMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!todo.title.trim()) return
    await addTodo({ ...todo })
    setTodo(defaultTodo)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 w-full max-w-sm">
        <input
          className="border border-gray-300 rounded px-2 py-1 w-full box-border"
          type="text"
          placeholder="Add new todo..."
          value={todo.title}
          onChange={e => setTodo(prev => ({ ...prev, title: e.target.value }))}
          disabled={isLoading}
        />
        <select
          className="border border-gray-300 rounded px-2 py-1 w-full box-border"
          value={todo.priority}
          onChange={e => setTodo(prev => ({ ...prev, priority: e.target.value as Priority }))}
          disabled={isLoading}
        >
          {[Priority.LOW, Priority.MEDIUM, Priority.HIGH].map(p => (
            <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition w-full"
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