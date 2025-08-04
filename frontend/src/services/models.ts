
export type ISelectFromResult<T> = {
  data?: T
  isLoading: boolean
  error?: unknown       
}

export const Priority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high"
} as const;

export type Priority = typeof Priority[keyof typeof Priority];

export type ITodo = {
     "id": number,
    "title": string,
    "priority": Priority,
    "completed": boolean,
    "created": string, // ISO date string
}

export type IPhoto = {
    "id": number,
    "title": string,
    "url": string,
}

export type IHealth = {
  status: string,
  db: boolean,
  cache: boolean,
  version: string
}

export const TodosTypes = {
  NOT_COMLETED: "not-completed",
  COMLETED: "completed"
} as const;

export const LIMIT_TODO = 100;

export const MenuRoutes = [
  { to: '/', title: 'Home' },
  { to: '/todos', title: 'Todos' },
  { to: `/todos/${TodosTypes.NOT_COMLETED}`, title: 'Todos not completed' },
  { to: `/todos/${TodosTypes.COMLETED}`, title: 'Todos completed' },
  { to: '/photos', title: 'Photos' },
  { to: 'https://secret-domain.net/next', title: 'Next' }
]
