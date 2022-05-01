import type { NextPage } from 'next'
import useSWR from "swr"
import axios, { AxiosResponse, AxiosError } from 'axios'

const PATH = 'https://jsonplaceholder.typicode.com/todos'

interface Todo {
	userId: number
	id: number
	title: string
	completed: boolean
}

export const Todos: NextPage = () => {
	const { data: response, error } = useSWR<AxiosResponse<Todo[]>, AxiosError<Error>>(PATH, () => axios.get(PATH).then((res) => res))

	if (error) return <>it is error!</>

	if (!response || !response.data) return <>loading...</>

	return (
		<>
			{response.data.map((res) => {
				return (
					<div key={res.id} style={{marginTop: '10px'}}>
						<p>{res.title}</p>
						<p>ステータス：{res.completed ? '完了' : '未完了'}</p>
					</div>
				)
			})}
		</>
	)
}

export default Todos