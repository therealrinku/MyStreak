import { useEffect, useRef, useState } from 'react';
import { GoPlus, GoFlame, GoClock } from 'react-icons/go';
import useTodos from '../hooks/use-todos.tsx';
import Toolbar from '../components/toolbar';

export default function MyStreakApp() {
  const { todos, handleUpdateTodo, handleCreateTodo } = useTodos();
  const [showAddNewInput, setShowAddNewInput] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toString());

  const [isFocused, setIsFocused] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    handleCreateTodo({ title, dueDate: new Date(date).toISOString() });
    setTitle('');
  }

  return (
    <div className="w-full min-h-[100vh] bg-white dark:bg-[#303030] text-sm text-white flex flex-col">
      <Toolbar />

      <div className="mt-16 w-full max-w-[800px] mx-auto mb-12">
        <form
          className="flex items-center justify-between border-b border-[#383838]"
          onSubmit={handleAdd}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Add new todo...."
            className="p-3 w-full bg-inherit outline-none"
          />

          {false && (
            <div className="flex items-center gap-5">
              <input
                type="date"
                className="p-3 bg-inherit outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <button type="submit">
                <GoPlus size={16} />
              </button>
            </div>
          )}
        </form>

        {todos.map((todo) => {
          return (
            <div
              key={todo.id}
              className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 flex items-start gap-3 border-b border-[#383838] last:border-none"
            >
              <input
                type="checkbox"
                className="mt-1"
                checked={todo.checked}
                onChange={() =>
                  handleUpdateTodo({ ...todo, checked: !todo.checked })
                }
              />

              <div className="flex flex-col gap-2">
                <p>{todo.title}</p>
                {todo.due && (
                  <p className="flex items-center gap-2">
                    <GoClock /> {todo.due}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
