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

  const stats = [
    {
      title: 'todos completed today',
      value: completedToday.length,
    },
    {
      title: 'todos added today',
      value: addedToday.length,
    },
    {
      title: 'backlogs added today',
      value: addedBacklogToday.length,
    },
    {
      title: 'total active todos',
      value: activeTodos.length,
    },
    {
      title: 'total completed todos',
      value: completedTodos.length,
    },
    {
      title: 'total backlog todos',
      value: backlogTodos.length,
    },
  ];

  return (
    <div>
      {stats.map((stat) => {
        return (
          <div
            key={stat.title}
            className="md:-[#1f1f1f] bg-opacity-40 py-3 px-3 relative flex items-center justify-between border-b border-[#383838]"
          >
            <p>{stat.title}</p>
            <b>{stat.value}</b>
          </div>
        );
      })}
    </div>
  );
}
