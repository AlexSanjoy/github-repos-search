import { call, cancel, fork, put, take, takeLatest } from 'redux-saga/effects'
import RequestService from '../../services/requestService'
import {
	GET_REPOS,
	CANCEL_FETCHING_REPOS
} from '../constants'
import {
	reposLoaded,
	reposRequested,
	reposErrored
} from '../actions/searchResults'

function* fetchReposAsync(payload) {
	try {
		yield put(reposRequested())
		
		const data = yield call(RequestService.fetchRepos, payload)
		const requestKey = btoa(JSON.stringify(payload))
		
		if (data && data.statusText === 'OK') {
			yield put(reposLoaded({
				repos: {
					[requestKey]: {
						items: data.data.items,
						reposCount: data.data.total_count > 1000 ? 1000 : data.data.total_count
					}
				},
				currentRequestKey: requestKey
			}))
		} else {
			yield put(reposErrored('Something went wrong... Try again later'))
		}
	} catch (err) {
		yield put(reposErrored(err))
	}
}

function* watchFetchRepos() {
	yield takeLatest(GET_REPOS, function* ({ payload }) {
		const task = yield fork(fetchReposAsync, payload)
		
		yield take(CANCEL_FETCHING_REPOS)
		yield cancel(task)
	})
}

export default watchFetchRepos