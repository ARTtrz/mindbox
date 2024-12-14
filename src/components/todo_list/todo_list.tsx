import { Todo } from '@/entities/todo';
import styles from './todo_list.module.css';
import cn from 'classnames';

const TodoList: React.FC<{
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ todos, toggleTodo, removeTodo, setTodos }) => (
  <ul className={styles.todo_list}>
    {todos.map((todo) => (
      <li
        key={todo.id}
        className={cn(styles.todo_item, {
          [styles.completed]: todo.completed,
        })}
      >
        <div
          className={cn(styles.custom_checkbox, {
            [styles.checked]: todo.completed,
          })}
          onClick={() => toggleTodo(todo.id)}
          role="checkbox"
        >
          {todo.completed && <span className={styles.checkmark}>✔</span>}
        </div>
        <span
          className={styles.todo_text}
          onDoubleClick={() => {
            const newText = prompt('Edit todo:', todo.text);
            if (newText !== null) {
              setTodos((prevTodos) =>
                prevTodos.map((t) =>
                  t.id === todo.id ? { ...t, text: newText.trim() } : t
                )
              );
            }
          }}
        >
          {todo.text}
        </span>
        <button
          className={styles.delete_btn}
          onClick={() => removeTodo(todo.id)}
        >
          ×
        </button>
      </li>
    ))}
  </ul>
);

export default TodoList;
