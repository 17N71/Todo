import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { ITodo, ITodoContext } from '../../../modules/Todo';
import TodoInput from './../TodoInput';
import TodoList from '../TodoList';
import TodoFooter from '../TodoFooter';
import useTodo from '../../../store/todoStore';

export const TodoContext = createContext<ITodoContext | {}>({});
function Todo() {
	const [value, setValue] = useState<string>('');
	const allTodos = useTodo(state => state.todos);
	const [todos, setTodos] = useState<ITodo[]>(allTodos);
	useEffect(() => {
		setTodos(allTodos);
	}, [allTodos]);
	return (
		<TodoContext.Provider value={{ value, setValue, todos, setTodos }}>
			<section>
				<TodoInput />
				<TodoList />
				<TodoFooter />
			</section>
		</TodoContext.Provider>
	);
}

export default Todo;
