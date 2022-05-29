import { atom } from "recoil"
import { Todo } from "../types/todo"

export const todoListState = atom<Todo[]>({
	key: 'TodoList',
	default: []
})