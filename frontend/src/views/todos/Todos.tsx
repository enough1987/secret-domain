import React from 'react'
import { useParams } from 'react-router'
import { TodosTypes } from '../../services/models';
import TodosCompleted from './TodosCompleted';
import TodosNotCompleted from './TodosNotCompleted';
import TodosAdd from './TodoAdd';

const Todos: React.FC = () => {
    const { type } = useParams<{ type: string }>()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">
            { type === TodosTypes.COMLETED && 'Completed'}
            { type === TodosTypes.NOT_COMLETED && 'Not Completed'}
            { (type !== TodosTypes.COMLETED && type !== TodosTypes.NOT_COMLETED) && 'Add Todos'}
        </h2>
        <div className="mb-4 text-sm text-gray-500">
        </div>
        <ul className="space-y-2 w-full">
          {type === TodosTypes.COMLETED && <TodosCompleted />}
          {type === TodosTypes.NOT_COMLETED && <TodosNotCompleted />}
          {(type !== TodosTypes.COMLETED && type !== TodosTypes.NOT_COMLETED) && <TodosAdd />}
        </ul>
      </div>
    </div>
  )
}

export default Todos