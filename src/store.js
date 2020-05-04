import { applyMiddleware, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import pagination from './redux/reducers/pagination.js'
import searchResults from './redux/reducers/searchResults.js'
import rootSaga from './redux/sagas'

const rootReducer = combineReducers({
	searchResults,
	pagination
})

const sagaMiddleware = createSagaMiddleware()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	rootReducer,
	composeEnhancer(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)

export default store
