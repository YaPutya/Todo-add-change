import React from 'react';

import styles from './TodoPanel.module.css';

import { Button } from '../Button/Button';

import { useTodo } from '../../utils';

const DEFAULT_TODO = {
  name: '',
  description: '',
};

interface AddTodoPanelProps {
  mode: 'add';
}

interface ChangeTodoPanelProps {
  mode: 'change';
  changeTodo: Omit<Todo, 'id' | 'checked'>;
}

type TodoPanelProps = AddTodoPanelProps | ChangeTodoPanelProps;

export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const { editTodo, addTodo } = useTodo();

  const isChange = props.mode === 'change';
  const [todo, setTodo] = React.useState(isChange ? props.changeTodo : DEFAULT_TODO);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  const onClick = () => {
    const todoItem = { name: todo.name, description: todo.description };
    if (isChange) {
      return editTodo(todoItem);
    }

    addTodo(todoItem);
    setTodo(DEFAULT_TODO);
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor="name">
            <div>name</div>
            <input type="text" id="name" value={todo.name} name="name" onChange={onChange} />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor="description">
            <div>description</div>
            <input
              type="text"
              id="description"
              value={todo.description}
              name="description"
              onChange={onChange}
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isChange && (
          <Button color="blue" onClick={onClick}>
            ADD
          </Button>
        )}
        {isChange && (
          <Button color="orange" onClick={onClick}>
            CHANGE
          </Button>
        )}
      </div>
    </div>
  );
};
