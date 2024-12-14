import { useState, useEffect } from "react";
import { Todo } from "./entities/todo";
import TodoHeader from "./components/todo_header/todo_header";
import TodoList from "./components/todo_list/todo_list";
import TodoFooter from "./components/todo_footer/todo_footer";

import styles from './App.module.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const getFilteredTodos = () => {
    if (filter === 'active') return todos.filter((todo) => !todo.completed);
    if (filter === 'completed') return todos.filter((todo) => todo.completed);
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>todos</h1>
      <div className={styles.todo_container}>
        <TodoHeader newTodo={newTodo} setNewTodo={setNewTodo} addTodo={addTodo} />
        <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} setTodos={setTodos} />
        <TodoFooter todos={todos} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
      </div>
      <div className={styles.caption}>
        If you want to edit a todo, just double-click.
      </div>
    </div>
  );
};

export default App;
