import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos, cancelFetchingRepos } from '../../redux/searchResults'
import './SearchBlock.sass'
import RequestService from '../../services/requestService'

const SearchBlock = () => {
	const dispatch = useDispatch()
	const [inputVal, setInputVal] = useState('')
	const { perPage, currentPage } = useSelector((state) => state.paginationReducer)
	
	useEffect(() => {
		if (currentPage !== '') searchRepos()
	}, [currentPage, perPage])
	
	function searchRepos() {
		if (inputVal) {
			dispatch(getRepos({
				q: `in:name+${inputVal}`,
				sort: 'stars',
				order: 'desc',
				per_page: perPage,
				page: currentPage || 1
			}))
		}
	}
	
	function handleFormSubmit(e) {
		e.preventDefault()
		searchRepos()
	}
	
	return (
		<form
			className={'search-block'}
			onSubmit={handleFormSubmit}
		>
			<input
				type="text"
				className={'search-block__input'}
				value={inputVal}
				onChange={(e) => setInputVal(e.target.value)}
			/>
			
			<div className={'search-block__buttons'}>
				<button
					className={'search-block__btn-search'}
					onClick={handleFormSubmit}
					type={'submit'}
					disabled={!inputVal}
				>
					Search
				</button>
				<button
					className={'search-block__btn-cancel'}
					type={'button'}
					onClick={() => {
						dispatch(cancelFetchingRepos())
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	)
}

export default SearchBlock