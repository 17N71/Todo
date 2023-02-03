import { create } from "zustand"
import { IUseTodo } from "./../modules/Todo"
import { persist, devtools } from "zustand/middleware"

const useTodo = create<IUseTodo>()(
	devtools(
		persist(
			(set, get) => ({
				todos: [],
				changeTodo: (id: number, e) => {
					e?.stopPropagation()
					get().todos.map((t) => {
						if (t.id === id) {
							return [...get().todos, (t.checked = !t.checked)]
						}
						return t
					})
					return set({
						todos: [...get().todos],
					})
				},
				removeTodo: (id: number) =>
					set({
						todos: [...get().todos.filter((t) => t.id !== id)],
					}),
				addTodo: (title: string) =>
					set({
						todos: [
							{
								title,
								id: get().todos.length + 1 + Math.random() * Math.random(),
								checked: false,
							},
							...get().todos,
						],
					}),
				clearTodos: () => set({ todos: [] }),
				editTodo: (id: number, title: string) => {
					get().todos.map((t) => {
						if (t.id === id) {
							return [...get().todos, (t.title = title.trimStart().trimEnd())]
						}
						return t
					})
					return set({
						todos: [...get().todos],
					})
				},
			}),

			{
				name: "todos",
			}
		)
	)
)
export default useTodo
