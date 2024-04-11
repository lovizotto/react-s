import React, { useEffect, useState } from 'react'
import './App.css'
import { Sheet } from './components/Sheet'
import { useStore } from './store/store'

function App() {
	const { initFromLocalStorage } = useStore()
	const [firstName, setFirstName] = React.useState('super')

	useEffect(() => {
		initFromLocalStorage()
	}, [initFromLocalStorage])

	const name = useTest(firstName)

	function handleTest() {
		setFirstName(String(Math.random() * 10))
	}
	return (
		<div className='App'>
			{/*<Sheet />*/}
			<button onClick={handleTest}>Test</button>
			<div>{firstName}</div>
		</div>
	)
}

const useTest = (firstName: string) => {
	const [name, setName] = React.useState('')

	useEffect(() => {
		console.log('executed')
		let isMounted = true

		if (isMounted) {
			Promise.resolve('test').then(name => {
				setName(name)
			})
		}

		return () => {
			isMounted = false
		}
	}, [firstName])

	return name
}

export default App
