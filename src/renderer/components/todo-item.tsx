import useTodos from '../hooks/use-todos';
import useSettings from '../hooks/use-settings';
import { useState } from 'react';
import {
  GoCheckCircle,
  GoArrowSwitch,
  GoMoveToTop,
  GoTrash,
} from 'react-icons/go';

export default function TodoItem({ todo, count, noBorder }) {
  const { handleUpdateTodo, handleDeleteTodo } = useTodos();
  const { settings } = useSettings();

  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between gap-3 ${noBorder ? 'border-b-0' : 'border-b border-[#383838]'}`}
    >
      <div className="flex  items-start gap-3 w-full">
        <div className="flex items-start gap-2 max-w-[92%] relative">
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
          <p className="-">
            {settings.confidentialMode ? (
              <span className="italic text-gray-500">
                redacted because confidential mode is on
              </span>
            ) : (
              todo.title
            )}
          </p>
        </div>

        <p
          className={`font-bold text-gray-100 ${isFocused ? 'opacity-80' : 'opacity-5'} absolute left-[-15px]`}
        >
          {count}
        </p>
      </div>

      {isFocused && (
        <div className="flex items-center gap-5">
          {todo.completed === 0 && (
            <button
              title="Move to top"
              className="absolute right-[78px]"
              onClick={() => handleUpdateTodo({ ...todo })}
            >
              <GoMoveToTop size={16} />
            </button>
          )}
          {todo.completed === 0 && (
            <button
              title={todo.backlog === 1 ? 'Move to todos' : 'Move to backlog'}
              className="absolute right-[40px]"
              onClick={() =>
                handleUpdateTodo({
                  ...todo,
                  backlog: todo.backlog === 0 ? 1 : 0,
                })
              }
            >
              <GoArrowSwitch size={16} />
            </button>
          )}
          <button
            title="Delete"
            className="absolute right-[6px]"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            <GoTrash size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
