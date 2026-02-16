import TodoItem from './todo-item';
import AddTodoForm from './add-todo-form';
import useTodos from '../hooks/use-todos';
import { GoBlocked, GoCheck } from 'react-icons/go';

export default function Completed() {
  const { todos } = useTodos();
  const completedTodos = todos
    .filter((todo) => todo.completed === 1)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const emptyStateMessage = 'You have not completed any todos yet.';

  return (
    <>
      {completedTodos.length > 0 ? (
        completedTodos.map((todo, index) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      ) : (
        <div className="flex items-center gap-2 p-3 text-gray-500">
          <GoBlocked size={15} />
          <b>{emptyStateMessage}</b>
        </div>
      )}
    </>
  );
}
