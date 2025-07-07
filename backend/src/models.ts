// Define types for Todo and DB structure
export interface Todo {
  id: string;
  title: string;
  priority: string;
  completed: boolean;
  created: string;
}

export interface Photo {
  id: string;
  title: string;
  url: string;
}

export interface DbJson {
  todos: Todo[];
  photos?: Photo[];
  profile?: {
    name: string;
  };
}
