import {
	useState,
	useRef,
	ChangeEvent,
	useContext,
	FormEvent,
	useEffect,
} from "react"
import { ITodoContext } from "../../../modules/Todo"
import useTodo from "../../../store/todoStore"
import { TodoContext } from "../Todo"
import { Button, TextField } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
function TodoInput() {
	const todoRegExp: RegExp = /^\s+$/gi
	const [todoErr, setTodoErr] = useState<boolean>(false)
	const todoRef = useRef<HTMLInputElement | null>(null)
	const { value, setValue } = useContext(TodoContext) as ITodoContext
	const addTodo = useTodo((state) => state.addTodo)
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value: targetValue } = e.target
		setValue(targetValue)
		if (todoRegExp.test(value)) {
			setTodoErr(true)
		} else {
			setTodoErr(false)
		}
	}
	const todoBlur = () => {
		if (todoRef.current && todoErr) {
			setValue("")
			setTodoErr(false)
		}
	}
	function createTodo(e: FormEvent) {
		e.preventDefault()
		if (value.trim().length) {
			addTodo(value)
			setValue("")
		}
	}
	useEffect(() => {
		const contextMenuHandle = (e: MouseEvent) => {
			console.log(e)
		}
		window.addEventListener("contextmenu", contextMenuHandle)
		return () => window.removeEventListener("contextmenu", contextMenuHandle)
	}, [])
	return (
		<form onSubmit={(e) => createTodo(e)} className='form'>
			<TextField
				fullWidth
				size={"small"}
				color={"success"}
				onChange={onChange}
				ref={todoRef}
				onBlur={todoBlur}
				value={value}
				onBlurCapture={todoBlur}
				error={todoErr}
				label={todoErr ? "Error" : "Create todo"}
				helperText={todoErr ? "Field cant be empty" : "Write a todo"}
				variant='standard'
			/>
			<Button type='submit' className='add-todo'>
				<AddIcon fontSize='large' />
			</Button>
		</form>
	)
}

export default TodoInput
