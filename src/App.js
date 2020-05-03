import React from 'react'
import { Switch, Route } from 'react-router-dom'
// import NotFoundPage from './components/NotFoundPage/NotFoundPage'
import SearchPage from './views/SearchPage/SearchPage'
import './assets/styles/main.sass'

const App = () => {
	return (
		<Switch>
			<Route path={'/'}>
				<SearchPage />
			</Route>
			<Route path={'*'}>
				{/*<NotFoundPage />*/}
			</Route>
		</Switch>
	)
}

export default App
