import { PER_PAGE_CHANGE, CURRENT_PAGE_CHANGE } from '../constants'

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
	perPageChange,
	currentPageChange
}