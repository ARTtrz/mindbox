import React from 'react';
import { Todo } from '@/entities/todo';
import styles from './todo_footer.module.css';
import cn from 'classnames';

const TodoFooter: React.FC<{
  todos: Todo[];
  filter: string;
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
}> = ({ todos, filter, setFilter, clearCompleted }) => (
  <div className={styles.footer}>
    <span className={styles.items_left}>
      {todos.filter((todo) => !todo.completed).length} items left
    </span>
    <div className={styles.filters}>
      <button
        className={cn({ [styles.selected]: filter === 'all' })}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={cn({ [styles.selected]: filter === 'active' })}
        onClick={() => setFilter('active')}
      >
        Active
      </button>
      <button
        className={cn({ [styles.selected]: filter === 'completed' })}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
    </div>
    <button className={styles.clear_completed} onClick={clearCompleted}>
      Clear completed
    </button>
  </div>
);

export default TodoFooter;
