import useTodos from '../hooks/use-todos';

export default function Stats() {
  const { todos } = useTodos();

  const date = new Date().toISOString();
  const completedToday = todos.filter((todo) => {
    // ensure timestamp exists and is a valid ISO-like string before slicing
    if (todo.completed !== 1) return false;
    const ts = todo.updated_at;
    if (!ts || typeof ts !== 'string') return false;
    const tIndex = ts.indexOf('T');
    if (tIndex === -1) return false;
    return ts.slice(0, tIndex) === date.slice(0, date.indexOf('T'));
  });
  const addedToday = todos.filter((todo) => {
    if (todo.backlog !== 0) return false;
    const ts = todo.created_at;
    if (!ts || typeof ts !== 'string') return false;
    const tIndex = ts.indexOf('T');
    if (tIndex === -1) return false;
    return ts.slice(0, tIndex) === date.slice(0, date.indexOf('T'));
  });
  const addedBacklogToday = todos.filter((todo) => {
    if (todo.backlog !== 1) return false;
    const ts = todo.created_at;
    if (!ts || typeof ts !== 'string') return false;
    const tIndex = ts.indexOf('T');
    if (tIndex === -1) return false;
    return ts.slice(0, tIndex) === date.slice(0, date.indexOf('T'));
  });
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
