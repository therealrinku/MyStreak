import TodoItem from './todo-item';
import AddTodoForm from './add-todo-form';
import useTodos from '../hooks/use-todos';

export default function Todos() {
  const { todos } = useTodos();
  const activeTodos = todos.filter(
    (todo) => todo.backlog === 0 && todo.completed === 0,
  );

  return (
    <>
      <AddTodoForm />
      {activeTodos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} />;
        })}
    </>
  );
}
