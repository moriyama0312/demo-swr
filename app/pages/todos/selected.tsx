import type { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { todoListState } from '../../state/atoms'

export const SelectedTodos: NextPage = () => {
	const todos = useRecoilValue(todoListState)
	console.log(todos)
	return (
		<>
			<h2>取得タスク一覧</h2>
			{todos.map((todo) => {
				return (
					<div key={todo.id}>
						<p>タスク名: {todo.title}</p>
						<p>ステータス: {todo.completed ? '完了' : '未完了'}</p>
					</div>
				)
			})}
			<h2>セレクトタスク一覧</h2>
		</>
	)
}

export default SelectedTodos