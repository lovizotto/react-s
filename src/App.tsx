import React, { useEffect } from 'react'
import './App.css'
import { Sheet } from './components/Sheet'
import { useStore } from './store/store'

function App() {
	const { initFromLocalStorage } = useStore()
	useEffect(() => {
		initFromLocalStorage()
	}, [initFromLocalStorage])

	return (
		<div className='App'>
			<Sheet />
		</div>
	)
}

export default App
