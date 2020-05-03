import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { searchResultsReducer, watchFetchRepos } from './redux/searchResults'

const rootReducer = combineReducers({
	searchResultsReducer
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(watchFetchRepos)

export default store
