import TodoItem from './todo-item';
import AddTodoForm from './add-todo-form';
import useTodos from '../hooks/use-todos';

export default function Backlog() {
  const { todos } = useTodos();
  const backlog = todos.filter((todo) => todo.backlog === 1);

  return (
    <>
      <AddTodoForm />
      {backlog
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
    </>
  );
}
