import { ChangeEvent } from "react"

export interface ITodoContext {
	value: string
	setValue: Function
	setTodos: Function
	todos: ITodo[]
}

export interface ITodo {
	id: number
	title: string
	checked: boolean
}
export interface IUseTodo {
	todos: ITodo[]
	addTodo: (title: string) => void
	removeTodo: (id: number) => void
	changeTodo: (id: number, e?: ChangeEvent<HTMLInputElement>) => void
	clearTodos: () => void
	editTodo: (id: number, title: string) => void
}
