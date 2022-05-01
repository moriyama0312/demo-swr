import type { NextPage } from 'next'
import useSWR from "swr"

const errorTest = async () => {
	await new Promise((resolve) => {
		resolve('hoge')
	})

	if (Math.random() < 0.5) throw new Error('error occurred')

	return new Date().toLocaleString()
}

export const ErrorTest: NextPage = () => {
	const { data: response, error } = useSWR('/error/test', errorTest, { dedupingInterval: 0 })

	if (error) return <>it is error!</>

	if (!response) return <>loading...</>

	return (
		<>
			{response}
		</>
	)
}

export default ErrorTest