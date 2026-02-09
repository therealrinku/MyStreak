import useTodos from '../hooks/use-todos';

export default function Analytics() {
  const { todos } = useTodos();

  const date = new Date().toISOString();
  const completedToday = todos.filter(
    (todo) =>
      todo.updated_at.split(' ')[0] === date.slice(0, date.indexOf('T')),
  );

  return (
    <div>
      <div className="flex items-start gap-1">
        <b className="text-2xl">{completedToday.length}</b>
        <p>todos completed today</p>
      </div>
    </div>
  );
}
