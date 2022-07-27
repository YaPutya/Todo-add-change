import React from 'react';
import { useTodo } from '../../utils';

import { TodoPanel } from '../TodoPanel/TodoPanel';
import { TodoItem } from './TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, todoIdForEdit, checkTodo, deleteTodo, selectTodoIDForEdit } = useTodo();

  return (
    <div>
      {todos.map((todo) => {
        if (todo.id === todoIdForEdit)
          return (
            <TodoPanel
              key={todo.id}
              mode="change"
              changeTodo={{ name: todo.name, description: todo.description }}
            />
          );

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkTodo={checkTodo}
            deleteTodo={deleteTodo}
            selectTodoIDForEdit={selectTodoIDForEdit}
          />
        );
      })}
    </div>
  );
};
