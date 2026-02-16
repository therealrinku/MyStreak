import TodoItem from './todo-item';
import AddTodoForm from './add-todo-form';
import useTodos from '../hooks/use-todos';
import { GoCheck } from 'react-icons/go';

export default function Backlog() {
  const { todos } = useTodos();
  const backlog = todos
    .filter((todo) => todo.backlog === 1 && todo.completed === 0)
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  return (
    <>
      <AddTodoForm isBacklog={true} />
      {backlog.length > 0 ? (
        backlog.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })
      ) : (
        <div className="flex items-center gap-2 p-3 text-gray-500">
          <GoCheck size={15} />
          <b>
            There are not any backlog items. Looks like you've got it all done!
          </b>
        </div>
      )}
    </>
  );
}
