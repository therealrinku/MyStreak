import useTodos from '../hooks/use-todos';
import { useState } from 'react';
import {
  GoCheckCircle,
  GoArrowSwitch,
  GoMoveToTop,
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
        <div className="flex gap-2 max-w-[90%] relative">
          <p className="flex items-center gap-2">{todo.title}</p>
        </div>

        <p
          className={`font-bold text-gray-100 ${isFocused ? 'opacity-80' : 'opacity-5'} absolute left-[-15px]`}
        >
          {count}
        </p>
      </div>

      {isFocused && (
        <div className="flex items-center gap-5">
          {todo.backlog === 0 && (
            <button
              className="absolute right-[105px] text-green-500"
              onClick={() =>
                handleUpdateTodo({
                  ...todo,
                  completed: todo.completed === 0 ? 1 : 0,
                })
              }
            >
              <GoCheckCircle size={16} />
            </button>
          )}
          <button
            className="absolute right-[70px]"
            onClick={() => handleUpdateTodo({ ...todo })}
          >
            <GoMoveToTop size={16} />
          </button>
          <button
            className="absolute right-[40px]"
            onClick={() =>
              handleUpdateTodo({ ...todo, backlog: todo.backlog === 0 ? 1 : 0 })
            }
          >
            <GoArrowSwitch size={16} />
          </button>
          <button
            className="absolute right-[6px]"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <GoTrash size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
