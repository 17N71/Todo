import { List } from "@mui/material"
import Box from "@mui/material/Box"
import { memo, useContext, useMemo } from "react"
import { TodoContext } from "./../Todo/index"
import { ITodoContext } from "../../../modules/Todo"
import TodoItem from "../TodoItem"
function TodoList() {
	const { todos } = useContext(TodoContext) as ITodoContext
	const memoTodos = useMemo(() => {
		return todos
	}, [todos])
	return (
		<Box mt={1}>
			<List className='todo-list'>
				{Boolean(memoTodos.length) &&
					memoTodos.map((t) => <TodoItem key={t.id} {...t} />)}
			</List>
		</Box>
	)
}

export default memo(TodoList)
