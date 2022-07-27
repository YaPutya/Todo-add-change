import React from 'react';

import { TodoContext } from './TodoContext';

const DEFAULT_TODO_LIST = [
  { id: 1, name: 'task 1', description: 'description 1', checked: false },
  { id: 2, name: 'task 2', description: 'description 2', checked: false },
  {
    id: 3,
    name: 'task 3',
    description:
      'so long description 3 so long description 3 so long description 3 so long description 3',
    checked: true,
  },
];

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = React.useState(DEFAULT_TODO_LIST);
  const [todoIdForEdit, setTodoIdForEdit] = React.useState<Todo['id'] | null>(null);

  const selectTodoIDForEdit = (id: Todo['id']) => {
    setTodoIdForEdit(id);
  };

  const addTodo = ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
    setTodos([...todos, { id: todos[todos.length - 1].id + 1, description, name, checked: false }]);
  };

  // с помощью map проходимся по всему массиву тасков, если id совпадает, то меняем на противоположное значение
  const checkTodo = (id: Todo['id']) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }

        return todo;
      }),
    );
  };

  // Фильтруем все кроме id
  const deleteTodo = (id: Todo['id']) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = ({ name, description }: Omit<Todo, 'checked' | 'id'>) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, name, description };
        }

        return todo;
      }),
    );
    setTodoIdForEdit(null);
  };

  const value = React.useMemo(
    () => ({
      todoIdForEdit,
      todos,
      deleteTodo,
      editTodo,
      addTodo,
      selectTodoIDForEdit,
      checkTodo,
    }),
    [todoIdForEdit, todos, deleteTodo, editTodo, addTodo, selectTodoIDForEdit, checkTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
