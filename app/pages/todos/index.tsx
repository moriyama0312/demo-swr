import type { NextPage } from 'next'
import useSWR from "swr"
import axios, { AxiosResponse, AxiosError } from 'axios'
import { Todo } from '../../types/todo'
import { useSetRecoilState } from 'recoil'
import { useRecoilValue } from 'recoil'
import { todoListState, todoListDisplayState, filteredTodoListState } from '../../state/atoms'

const PATH = 'https://jsonplaceholder.typicode.com/todos'

export const Todos: NextPage = () => {
	const { data: response, error } = useSWR<AxiosResponse<Todo[]>, AxiosError<Error>>(PATH, () => axios.get(PATH).then((res) => res))
	const setTodoState = useSetRecoilState(todoListState)
	const setTodoDisplayState = useSetRecoilState(todoListDisplayState)
	const todoState = useRecoilValue(filteredTodoListState)

	if (error) return <>it is error!</>

	if (!response || !response.data) return <>loading...</>

	const firstTenTodos = response.data.slice(0, 10)

	return (
		<>
			<h2>取得タスク一覧</h2>
			{firstTenTodos.map((res) => {
				return (
					<button type='button' key={res.id} onClick={() => setTodoState((v) => [...v, res])}>
						<div>
							<p>{res.title}</p>
							<p>ステータス：{res.completed ? '完了' : '未完了'}</p>
						</div>
					</button>
				)
			})}
			<h2 style={{marginTop: '40px'}}>セレクトタスク一覧</h2>
			<div><button type='button' onClick={() => setTodoDisplayState('all')}>全部</button><button type='button' onClick={() => setTodoDisplayState('completed')}>完了だけ</button></div>
			{todoState.map((todo) => {
				return (
					<button type='button' key={todo.id}>
						<div style={{marginTop: '10px'}}>
							<p>{todo.title}</p>
							<p>ステータス：{todo.completed ? '完了' : '未完了'}</p>
						</div>
					</button>
				)
			})}
		</>
	)
}

export default Todos