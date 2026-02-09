import TodoItem from './todo-item';
import AddTodoForm from './add-todo-form';
import useTodos from '../hooks/use-todos';
import { GoBlocked, GoCheck } from 'react-icons/go';

export default function Todos() {
  const { todos } = useTodos();
  const activeTodos = todos
    .filter((todo) => todo.backlog === 0 && todo.completed === 0)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  const userHasCompletedSomeTodo = todos.find((todo) => todo.completed === 1);
  const emptyStateMessage = userHasCompletedSomeTodo
    ? "Yay! you're all done!"
    : 'There are not any todos yet.';

  return (
    <>
      <AddTodoForm />
      {activeTodos.length > 0 ? (
        activeTodos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      ) : (
        <div className="flex items-center gap-2 p-3 text-gray-500">
          {userHasCompletedSomeTodo ? (
            <GoCheck size={15} />
          ) : (
            <GoBlocked size={15} />
          )}
          <b>{emptyStateMessage}</b>
        </div>
      )}
    </>
  );
}
