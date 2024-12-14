import styles from './todo_header.module.css';

const TodoHeader: React.FC<{ newTodo: string; setNewTodo: (value: string) => void; addTodo: () => void; }> = ({ newTodo, setNewTodo, addTodo }) => (
  <div className={styles.header}>
    <span className={styles.dropdown_arrow}>▼</span>
    <input
      className={styles.new_todo}
      placeholder="What needs to be done?"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && addTodo()}
    />
  </div>
);

export default TodoHeader;