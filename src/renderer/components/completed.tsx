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

  const dates = new Set(
    completedTodos.map((todo) => {
      const date = new Date(todo.updated_at).toISOString();
      return date.slice(0, date.indexOf('T'));
    }),
  );

  return (
    <>
      {new Array(...dates).map((date) => {
        const todos = completedTodos.filter((todo) => {
          const todoDate = new Date(todo.updated_at).toISOString();
          return todoDate.slice(0, todoDate.indexOf('T')) === date;
        });
        return (
          <div
            key={date}
            className="flex flex-col mb-3 border-b border-[#383838]"
          >
            <b>
              {new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'full',
              }).format(new Date(date))}
            </b>

            <div className="mt-2">
              {todos.map((todo, index) => {
                return <TodoItem key={todo.id} todo={todo} noBorder={true} />;
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
