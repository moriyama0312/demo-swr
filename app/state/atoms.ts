import { atom, selector } from "recoil"
import { Todo } from "../types/todo"

export const todoListState = atom<Todo[]>({
	key: 'TodoList',
	default: []
})

export const todoListDisplayState = atom<'all' | 'completed'>({
	key: 'TodoListDisplay',
	default: 'all'
})

export const filteredTodoListState = selector<Todo[]>({
	key: 'FilteredTodoList',
	get: ({ get }) => {
		const displayType = get(todoListDisplayState)
		const todoList = get(todoListState)

		const result = displayType === 'all' ? todoList : todoList.filter((todo) => todo.completed)

		return result
	}
})