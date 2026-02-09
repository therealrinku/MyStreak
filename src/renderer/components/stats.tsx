import useTodos from '../hooks/use-todos';

export default function Stats() {
  const { todos } = useTodos();

  const date = new Date().toISOString();
  const completedToday = todos.filter(
    (todo) =>
      todo.completed === 1 &&
      todo.updated_at.split(' ')[0] === date.slice(0, date.indexOf('T')),
  );
  const addedToday = todos.filter(
    (todo) =>
      todo.backlog === 0 &&
      todo.created_at.split(' ')[0] === date.slice(0, date.indexOf('T')),
  );
  const addedBacklogToday = todos.filter(
    (todo) =>
      todo.backlog === 1 &&
      todo.created_at.split(' ')[0] === date.slice(0, date.indexOf('T')),
  );
  const activeTodos = todos.filter((todo) => todo.backlog === 0);
  const backlogTodos = todos.filter((todo) => todo.backlog === 1);

  return (
    <div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center gap-3 border-b border-[#383838]">
        <b>{completedToday.length}</b>
        <p>todos completed today</p>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center gap-3 border-b border-[#383838]">
        <b>{addedToday.length}</b>
        <p>todos added today</p>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center gap-3 border-b border-[#383838]">
        <b>{addedBacklogToday.length}</b>
        <p>backlogs added today</p>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center gap-3 border-b border-[#383838]">
        <b>{activeTodos.length}</b>
        <p>total todos</p>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center gap-3 border-b border-[#383838]">
        <b>{backlogTodos.length}</b>
        <p>total backlog todos</p>
      </div>
    </div>
  );
}
