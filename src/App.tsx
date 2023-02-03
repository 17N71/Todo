import { Typography } from '@mui/material';
import Todo from './components/Todo';
function App() {
	return (
		<>
			<header>
				<Typography variant="h2" mt={2} component="h1" className="todo-title">
					Todo App
				</Typography>
			</header>
			<main>
				<Todo />
			</main>
			<footer>
				All rights reversed by Narek Grigoryan 17N71 <span>&copy;</span>
			</footer>
		</>
	);
}

export default App;
