import React from 'react'
import SearchBlock from '../../components/SearchBlock/SearchBlock'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

const SearchPage = () => {
	return (
		<div>
			<SearchBlock />
			<Pagination />
			<SearchResults />
		</div>
	)
}

export default SearchPage