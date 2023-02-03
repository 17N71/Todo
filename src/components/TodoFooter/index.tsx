import useTodo from '../../../store/todoStore';
import { useContext } from 'react';
import { TodoContext } from '../Todo';
import { ITodoContext } from '../../../modules/Todo';

function TodoFooter() {
	const todos = useTodo(s => s.todos);
	const { setTodos } = useContext(TodoContext) as ITodoContext;
	const completedTodos = todos.filter(t => t.checked === true);
	const showOnlyCompleteds = () =>
		setTodos(todos.filter(t => t.checked === true));
	const showNotCompleteds = () =>
		setTodos(todos.filter(t => t.checked !== true));
	const showAll = () => setTodos([...todos]);
	return (
		<div>
			{todos.length}/{completedTodos.length}
			<button onClick={showOnlyCompleteds}>show only completeds</button>
			<button onClick={showNotCompleteds}>show only not completeds</button>
			<button onClick={showAll}>show all</button>
		</div>
	);
}

export default TodoFooter;
