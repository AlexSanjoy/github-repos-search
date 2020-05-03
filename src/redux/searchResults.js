import { takeLatest, put, call, cancel, cancelled, fork, take, takeEvery } from 'redux-saga/effects'
import RequestService from '../services/requestService'

const REQUEST_REPOS = 'REQUEST_REPOS'
const REQUEST_REPOS_SUCCESS = 'REQUEST_REPOS_SUCCESS'
const REQUEST_REPOS_ERROR = 'REQUEST_REPOS_ERROR'
const GET_REPOS = 'GET_REPOS'

const initialState = {
	repos: [],
	reposCount: 0,
	loading: true,
	error: false,
}

const searchResultsReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_REPOS:
			return {
				...state,
				loading: true
			}
		case REQUEST_REPOS_SUCCESS:
			const totalCount = action.payload.total_count
			
			return {
				...state,
				repos: action.payload.items,
				reposCount: totalCount > 1000 ? 1000 : totalCount,
				loading: false,
			}
		case REQUEST_REPOS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		
		default:
			return state
	}
}

const reposRequested = () => {
	return {
		type: REQUEST_REPOS,
	}
}

const reposLoaded = (data) => {
	return {
		type: REQUEST_REPOS_SUCCESS,
		payload: data,
	}
}

const reposErrored = (err) => {
	return {
		type: REQUEST_REPOS_ERROR,
		payload: err,
	}
}

const getRepos = (payload) => {
	return {
		type: GET_REPOS,
		payload: payload
	}
}

const cancelFetchingRepos = () => {
	return {
		type: 'CANCEL_REQUEST',
	}
}

function* watchFetchRepos() {
	yield takeLatest('GET_REPOS', function* ({ payload }) {
		const task = yield fork(fetchReposAsync, payload)

		yield take('CANCEL_REQUEST')
		yield cancel(task)
	})
}

function* fetchReposAsync(payload) {
	try {
		yield put(reposRequested())
		const data = yield call(RequestService.fetchRepos, payload)
		
		yield put(reposLoaded(data.data))
	} finally {
		if (yield cancelled()) {
			console.log('cancel')
		}
	}
}

export {
	searchResultsReducer,
	watchFetchRepos,
	getRepos,
	cancelFetchingRepos
}
