import {
	REQUEST_REPOS,
	REQUEST_REPOS_SUCCESS,
	REQUEST_REPOS_ERROR,
	CHANGE_CURRENT_REQUEST_KEY,
	CANCEL_FETCHING_REPOS
} from '../constants'

const initialState = {
	repos: {},
	currentRequestKey: '',
	loading: false,
	error: false
}

const searchResults = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_REPOS:
			return {
				...state,
				loading: true
			}
		
		case CANCEL_FETCHING_REPOS:
			return {
				...state,
				loading: false
			}
		
		case CHANGE_CURRENT_REQUEST_KEY:
			return {
				...state,
				currentRequestKey: action.payload
			}
		
		case REQUEST_REPOS_SUCCESS:
			const { repos, reposCount, currentRequestKey } = action.payload
			
			return {
				...state,
				loading: false,
				repos: {
					...state.repos,
					...repos
				},
				reposCount: reposCount,
				currentRequestKey: currentRequestKey
			}
		
		case REQUEST_REPOS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload
			}
		
		default:
			return state
	}
}

export default searchResults