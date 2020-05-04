import {
	PER_PAGE_CHANGE,
	CURRENT_PAGE_CHANGE,
	CANCEL_FETCHING_REPOS
} from '../constants'

const initialState = {
	perPage: 30,
	prevPerPage: 30,
	currentPage: 1,
	prevCurrentPage: 1
}

const pagination = (state = initialState, action) => {
	switch (action.type) {
		case PER_PAGE_CHANGE:
			return {
				...state,
				prevPerPage: state.perPage,
				perPage: action.payload
			}
			
		case CURRENT_PAGE_CHANGE:
			return {
				...state,
				prevCurrentPage: state.prevCurrentPage,
				currentPage: action.payload
			}
			
		case CANCEL_FETCHING_REPOS:
			return {
				...state,
				perPage: state.prevPerPage,
				currentPage: state.prevCurrentPage
			}
		
		default:
			return state
	}
}

export default pagination