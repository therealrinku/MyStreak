import { useState } from 'react';
import useTodos from '../hooks/use-todos';
import { GoIterations, GoPlus } from 'react-icons';

export default function AddTodoForm({ isBacklog }) {
  const { handleCreateTodo } = useTodos();

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toString());

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    handleCreateTodo({ title, backlog: isBacklog ? 1 : 0 });
    setTitle('');
  }

  return (
    <form
      className="flex items-center justify-between border-b border-[#383838]"
      onSubmit={handleAdd}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder={isBacklog ? 'Add new backlog todo...' : 'Add new todo....'}
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
  );
}
