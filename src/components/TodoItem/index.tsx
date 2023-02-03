import useTodo from "../../../store/todoStore"
import {
	useState,
	useRef,
	useCallback,
	MouseEvent,
	memo,
	useEffect,
} from "react"
import { ListItem, ListItemText, Button, Checkbox } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import CheckIcon from "@mui/icons-material/Check"
interface ITodoItemProps {
	id: number
	title: string
	checked: boolean
}
function TodoItem({ id, title, checked }: ITodoItemProps) {
	const editableRef = useRef<HTMLElement>(null)
	const editTodo = useTodo((state) => state.editTodo)
	const changeTodo = useTodo((state) => state.changeTodo)
	const removeTodo = useTodo((state) => state.removeTodo)
	const [isEditable, setIsEditable] = useState<boolean>(false)
	function sendEditTodo(id: number) {
		if (isEditable) {
			const newTitle =
				editableRef.current?.textContent?.trimEnd().trimStart() || ""
			editTodo(id, newTitle.trimStart().trimEnd())
		}
	}
	const makeEditable = (id: number, e?: MouseEvent<HTMLButtonElement>) => {
		e?.stopPropagation()
		setIsEditable(!isEditable)
		sendEditTodo(id)
	}

	function StopProp(e: MouseEvent<HTMLElement>) {
		e.stopPropagation()
	}
	const memoChangeTodo = useCallback((id: number) => {
		changeTodo(id)
	}, [])
	const memoMakeEditable = useCallback(
		(id: number, e?: MouseEvent<HTMLButtonElement>) => {
			makeEditable(id, e)
		},
		[isEditable]
	)
	const memoRemoveTodo = useCallback((id: number) => {
		removeTodo(id)
	}, [])
	const fousedEnter = () => {
		window.addEventListener("keydown", function (e: KeyboardEvent) {
			if (e.which === 13) {
				memoMakeEditable(Number(editableRef.current?.dataset.todoId))
			}
		})
	}
	return (
		<ListItem>
			<ListItemText
				className={`${checked ? "todo-item-checked" : ""} ${
					isEditable ? "editable" : ""
				}`}
				onClick={StopProp}
				contentEditable={isEditable}
				ref={editableRef}
				data-todo-id={id}
				onFocus={fousedEnter}
				suppressContentEditableWarning={true}
			>
				{title}
			</ListItemText>
			<Checkbox checked={checked} onChange={() => memoChangeTodo(id)} />
			<Button className='add-todo' onClick={() => memoRemoveTodo(id)}>
				<ClearIcon fontSize={"small"} />
			</Button>
			<Button className='add-todo' onClick={(e) => memoMakeEditable(id, e)}>
				{!isEditable ? (
					<EditIcon fontSize={"small"} />
				) : (
					<CheckIcon fontSize={"small"} />
				)}
			</Button>
		</ListItem>
	)
}

export default memo(TodoItem)
