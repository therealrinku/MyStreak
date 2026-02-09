import useTodos from '../hooks/use-todos';
import { useState } from 'react';
import {
  GoArrowBoth,
  GoArrowSwitch,
  GoChevronUp,
  GoFoldUp,
  GoTrash,
} from 'react-icons/go';

export default function TodoItem({ todo, count }) {
  const { handleUpdateTodo, handleDeleteTodo } = useTodos();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 border-b border-[#383838]"
    >
      <div className="flex  items-start gap-3 w-full">
        <input
          type="checkbox"
          className="mt-1"
          checked={todo.completed === 1}
          onChange={() =>
            handleUpdateTodo({
              ...todo,
              completed: todo.completed === 0 ? 1 : 0,
            })
          }
        />

        <div className="flex gap-2 max-w-[90%] relative">
          <p className="flex items-center gap-2">{todo.title}</p>
        </div>

        {count <=5 && <p className={`font-bold text-gray-100 ${isFocused ? 'opacity-80' : 'opacity-5'} absolute left-[-5px]`}>{count}</p>}
      </div>

      {isFocused && (
        <div className="flex items-center gap-5">
          <button
            className="absolute right-20"
            onClick={() => handleUpdateTodo({ ...todo })}
          >
            <GoFoldUp size={20} />
          </button>
          <button
            className="absolute right-12"
            onClick={() =>
              handleUpdateTodo({ ...todo, backlog: todo.backlog === 0 ? 1 : 0 })
            }
          >
            <GoArrowSwitch size={16} />
          </button>
          <button
            className="absolute right-3"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <GoTrash size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
