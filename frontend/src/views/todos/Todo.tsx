import React, { useState } from 'react'
import type { ITodo } from '../../services/models'
import { FaTrash, FaEdit } from 'react-icons/fa'

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
      className="bg-white rounded shadow p-3 flex items-center w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <input
        type="checkbox"
        className="mr-3 cursor-pointer"
        checked={todo?.completed}
        onChange={onChange}
        disabled={!todo || !(onUpdate || onDelete)}
      />
      {hovered && onUpdate ? (
        <input
          className="border border-gray-200 px-1 py-1 mr-2 flex-1 box-border"
          value={todo?.title}
          onChange={e => setTodo(prev => prev ? { ...prev, title: e.target.value } : null)}
        />
      ) : (
        <span
          className={todo?.completed 
            ? 'line-through text-gray-400 px-1 py-1 mr-2 flex-1' 
            : 'px-1 py-1 mr-2 flex-1'
        }>
          {todo?.title}
        </span>
      )}
      <button
        className={`ml-auto mr-2 text-gray-500 hover:text-gray-700 cursor-pointer transition-opacity duration-150 ${hovered && onUpdate ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        title="Update"
        type="button"
        onClick={() => onUpdate?.(todo as ITodo)}
        tabIndex={-1}
        aria-hidden={!hovered || !onUpdate}
      >
        <FaEdit />
      </button>
      <button
        className={`text-gray-500 hover:text-gray-700 cursor-pointer transition-opacity duration-150 ${hovered && onDelete? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
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