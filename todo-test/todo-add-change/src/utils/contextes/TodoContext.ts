import React from 'react'

export interface TodoContextProps { 
  todos: Todo[];
  todoIdForEdit: Todo['id'] | null;
  addTodo: ({ name, description }: Omit<Todo, 'checked' | 'id'>) => void;
  editTodo: ({ name, description }: Omit<Todo, 'checked' | 'id'>) => void;
  checkTodo: (id: Todo['id']) => void;
  deleteTodo: (id: Todo['id']) => void;
  selectTodoIDForEdit: (id: Todo['id']) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
    todos: [],
    todoIdForEdit: null,
    addTodo: () => {},
    editTodo: () => {},
    checkTodo: () => {},
    deleteTodo: () => {},
    selectTodoIDForEdit:() => {}
})