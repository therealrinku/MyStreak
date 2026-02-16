import useTodos from '../hooks/use-todos';

export default function Analytics() {
  const { todos } = useTodos();

  const date = new Date().toISOString();
  const today = date.slice(0, date.indexOf('T'));
  const completedToday = (todos || []).filter((todo) => {
    const updated = todo?.updated_at;
    if (!updated || typeof updated !== 'string') return false;

    // Support common timestamp formats:
    // - ISO: "YYYY-MM-DDTHH:MM:SS..."
    // - Space-separated: "YYYY-MM-DD HH:MM:SS..."
    // - Plain date: "YYYY-MM-DD"
    const todoDate = updated.includes('T')
      ? updated.slice(0, updated.indexOf('T'))
      : updated.includes(' ')
        ? updated.split(' ')[0]
        : updated;

    return todoDate === today;
  });

  return (
    <div>
      <div className="flex items-start gap-1">
        <b className="text-2xl">{completedToday.length}</b>
        <p>todos completed today</p>
      </div>
    </div>
  );
}
