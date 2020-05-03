import { takeLatest, put, call } from 'redux-saga/effects'
import RequestService from '../services/requestService'

const REQUEST_REPOS = 'REQUEST_REPOS'
const REQUEST_REPOS_SUCCESS = 'REQUEST_REPOS_SUCCESS'
const REQUEST_REPOS_ERROR = 'REQUEST_REPOS_ERROR'
const GET_REPOS = 'GET_REPOS'

const initialState = {
	repos: [],
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
			return {
				...state,
				repos: action.payload,
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

function* watchFetchRepos() {
	yield takeLatest('GET_REPOS', fetchReposAsync)
}

function* fetchReposAsync({ payload }) {
	try {
		yield put(reposRequested())
		const data = yield call(() => RequestService.fetchRepos(payload))
		
		yield put(reposLoaded(data.data.items))
	} catch (err) {
		yield put(reposErrored(err))
	}
}

export {
	searchResultsReducer,
	watchFetchRepos,
	getRepos
}
