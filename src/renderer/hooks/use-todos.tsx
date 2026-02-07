import { useContext } from 'react';
import { RootContext } from '../context/root-context';

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  due_date: string | null;
  category_id: number;
}

export default function useTodos() {
  const { selectedCategory, todos, setTodos } = useContext(RootContext);

  const categoryId = selectedCategory.id;

  function handleCreateTodo({ title, dueDate }) {
    window.electron.ipcRenderer.sendMessage('upsert-todo', {
      title,
      dueDate,
      categoryId,
    });

    window.electron.ipcRenderer.once('upsert-todo', (todoItem) => {
      setTodos((prev) => [todoItem as ITodo, ...prev]);
    });
  }

  function handleUpdateTodo({ id, title, completed } = {}) {
    window.electron.ipcRenderer.sendMessage('upsert-todo', {
      id,
      title,
      categoryId,
      completed,
    });

    window.electron.ipcRenderer.once('upsert-todo', (updatedTodoItem) => {
      const updatedTodos = [...todos];
      const todoIndex = todos.findIndex((todo) => todo.id === id);

      updatedTodos[todoIndex] = updatedTodoItem as ITodo;
      setTodos(updatedTodos);
    });
  }

  function handleDeleteTodo(id: number) {
    const confirmed = confirm(`Are you sure want to delete this todo item? `);
    if (!confirmed) {
      return;
    }

    window.electron.ipcRenderer.sendMessage('delete-todo', id);

    window.electron.ipcRenderer.on('delete-todo', () => {
      setTodos((prev) => prev.filter((note) => todo.id !== id));
    });
  }

  return {
    todos,
    handleCreateTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
}
