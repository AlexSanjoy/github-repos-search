const PER_PAGE_CHANGE = 'PER_PAGE_CHANGE'
const CURRENT_PAGE_CHANGE = 'CURRENT_PAGE_CHANGE'

const initialState = {
	perPage: 30,
	currentPage: 1
}

const paginationReducer = (state = initialState, action) => {
	switch (action.type) {
		case PER_PAGE_CHANGE:
			return {
				...state,
				perPage: action.payload
			}
		case CURRENT_PAGE_CHANGE:
			return {
				...state,
				currentPage: action.payload
			}
		
		default:
			return state
	}
}

const perPageChange = (payload) => {
	return {
		type: PER_PAGE_CHANGE,
		payload: payload
	}
}

const currentPageChange = (payload) => {
	return {
		type: CURRENT_PAGE_CHANGE,
		payload: payload
	}
}

export {
	paginationReducer,
	perPageChange,
	currentPageChange
}
