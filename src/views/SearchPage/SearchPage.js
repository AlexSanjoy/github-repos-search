import React from 'react'
import SearchBlock from '../../components/SearchBlock/SearchBlock'
import SearchResults from '../../components/SearchResults/SearchResults'
import Pagination from '../../components/Pagination/Pagination'

const SearchPage = () => {
	return (
		<React.Fragment>
			<SearchBlock />
			<Pagination />
			<SearchResults />
		</React.Fragment>
	)
}

export default SearchPage