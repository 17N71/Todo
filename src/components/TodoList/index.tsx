import { List, ListItem, ListItemText, Button, Checkbox } from '@mui/material';
import Box from '@mui/material/Box';
import useTodo from '../../../store/todoStore';
import ClearIcon from '@mui/icons-material/Clear';
import { useContext } from 'react';
import { TodoContext } from './../Todo/index';
import { ITodoContext } from '../../../modules/Todo';
function TodoList() {
	const { todos } = useContext(TodoContext) as ITodoContext;
	const changeTodo = useTodo(state => state.changeTodo);
	const removeTodo = useTodo(state => state.removeTodo);

	return (
		<Box mt={1}>
			<List className="todo-list">
				{Boolean(todos.length) &&
					todos.map(t => (
						<ListItem key={t.id}>
							<ListItemText className={t.checked ? 'todo-item-checked' : ''}>
								{t.title}
							</ListItemText>
							<Checkbox checked={t.checked} onChange={() => changeTodo(t.id)} />
							<Button className="add-todo" onClick={() => removeTodo(t.id)}>
								<ClearIcon fontSize={'medium'} />
							</Button>
						</ListItem>
					))}
			</List>
		</Box>
	);
}

export default TodoList;
