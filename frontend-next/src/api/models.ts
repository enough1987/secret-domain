export const TodosTypes = {
  NOT_COMLETED: "not-completed",
  COMLETED: "completed"
} as const;

export const MenuRoutes = [
  { to: 'https://secret-domain.net/', title: 'Home' },
  { to: 'https://secret-domain.net/todos', title: 'Todos' },
  { to: `https://secret-domain.net/todos/${TodosTypes.NOT_COMLETED}`, title: 'Todos not completed' },
  { to: `https://secret-domain.net/todos/${TodosTypes.COMLETED}`, title: 'Todos completed' },
  { to: 'https://secret-domain.net/photos', title: 'Photos' },
  { to: '/next', title: 'Next' },
]

export const BASE_NEXT_AUTH_URL = '/next/api/auth';