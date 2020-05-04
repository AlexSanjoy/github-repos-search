import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRepos, cancelFetchingRepos, changeCurrentRequestKey } from '../../redux/actions/searchResults'
import './SearchBlock.sass'

const SearchBlock = () => {
	const dispatch = useDispatch()
	const [inputVal, setInputVal] = useState('')
	const { perPage, currentPage } = useSelector((state) => state.pagination)
	const { loading, repos } = useSelector((state) => state.searchResults)
	
	useEffect(() => {
		if (currentPage !== '') searchRepos()
	}, [currentPage, perPage])
	
	function searchRepos() {
		const payload = {
			q: `in:name+${inputVal}`,
			sort: 'stars',
			order: 'desc',
			per_page: +perPage,
			page: +currentPage || 1
		}
		const requestKey = btoa(JSON.stringify(payload))
		
		if (repos[requestKey]) {
			dispatch(changeCurrentRequestKey(requestKey))
		} else {
			if (inputVal) {
				dispatch(getRepos(payload))
			}
		}
	}
	
	function handleFormSubmit(e) {
		e.preventDefault()
		searchRepos()
	}
	
	return (
		<section className={'search-block'}>
			<form
				className={'search-form'}
				onSubmit={handleFormSubmit}
			>
				<input
					type="text"
					className={'search-form__input'}
					placeholder={'Search...'}
					value={inputVal}
					onChange={(e) => setInputVal(e.target.value)}
				/>
				
				<div className={'search-form__buttons'}>
					{loading ?
						<button
							className={'search-form__btn-cancel'}
							type={'button'}
							onClick={(e) => {
								e.preventDefault()
								dispatch(cancelFetchingRepos())
							}}
						>
							Cancel
						</button> :
						<button
							className={'search-form__btn-search'}
							onClick={handleFormSubmit}
							type={'submit'}
							disabled={!inputVal}
						>
							Search
						</button>
					}
				</div>
			</form>
		</section>
	)
}

export default SearchBlock