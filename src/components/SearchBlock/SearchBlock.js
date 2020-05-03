import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRepos } from '../../redux/searchResults'
import './SearchBlock.sass'

const SearchBlock = () => {
	const dispatch = useDispatch()
	const [inputVal, setInputVal] = useState('')
	
	function handleFormSubmit(e) {
		e.preventDefault()
		
		dispatch(getRepos({
			q: `in:name+${inputVal}`,
			sort: 'stars',
			order: 'desc',
			per_page: 30,
			page: 1
		}))
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
				>
					Cancel
				</button>
			</div>
		</form>
	)
}

export default SearchBlock