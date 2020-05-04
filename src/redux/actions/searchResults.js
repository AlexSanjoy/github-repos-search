import {
	REQUEST_REPOS,
	REQUEST_REPOS_SUCCESS,
	REQUEST_REPOS_ERROR,
	GET_REPOS,
	CANCEL_FETCHING_REPOS,
	CHANGE_CURRENT_REQUEST_KEY
} from '../constants'

const reposRequested = () => {
	return {
		type: REQUEST_REPOS
	}
}

const reposLoaded = (data) => {
	return {
		type: REQUEST_REPOS_SUCCESS,
		payload: data
	}
}

const reposErrored = (err) => {
	return {
		type: REQUEST_REPOS_ERROR,
		payload: err
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
		type: CANCEL_FETCHING_REPOS
	}
}

const changeCurrentRequestKey = (payload) => {
	return {
		type: CHANGE_CURRENT_REQUEST_KEY,
		payload: payload
	}
}

export {
	reposRequested,
	reposLoaded,
	reposErrored,
	getRepos,
	cancelFetchingRepos,
	changeCurrentRequestKey
}