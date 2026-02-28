import useTodos from '../hooks/use-todos';

export default function Stats() {
  const { todos } = useTodos();

  const date = new Date().toISOString();

  const completedToday = todos.filter((todo) => {
    const updatedAtDate = new Date(todo.updated_at).toISOString();
    return (
      todo.completed === 1 &&
      updatedAtDate.slice(0, updatedAtDate.indexOf('T')) ===
        date.slice(0, date.indexOf('T'))
    );
  });
  const addedToday = todos.filter((todo) => {
    const createdAtDate = new Date(todo.created_at).toISOString();
    return (
      todo.backlog === 0 &&
      createdAtDate.slice(0, createdAtDate.indexOf('T')) ===
        date.slice(0, date.indexOf('T'))
    );
  });
  const addedBacklogToday = todos.filter((todo) => {
    const createdAtDate = new Date(todo.created_at).toISOString();
    return (
      todo.backlog === 1 &&
      createdAtDate.slice(0, createdAtDate.indexOf('T')) ===
        date.slice(0, date.indexOf('T'))
    );
  });
  const activeTodos = todos.filter(
    (todo) => todo.backlog === 0 && todo.completed === 0,
  );
  const completedTodos = todos.filter((todo) => todo.completed === 1);
  const backlogTodos = todos.filter((todo) => todo.backlog === 1);

  return (
    <div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>todos completed today</p>
        <b>{completedToday.length}</b>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>todos added today</p>
        <b>{addedToday.length}</b>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>backlogs added today</p>
        <b>{addedBacklogToday.length}</b>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>total active todos</p>
        <b>{activeTodos.length}</b>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>total completed todos</p>
        <b>{completedTodos.length}</b>
      </div>
      <div className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]">
        <p>total backlog todos</p>
        <b>{backlogTodos.length}</b>
      </div>
    </div>
  );
}
