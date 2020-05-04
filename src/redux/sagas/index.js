import watchFetchRepos from './searchResults'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
	yield all([
		watchFetchRepos()
	])
}