import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Table from '../Table/Table'


const SearchResults = () => {
	const { repos } = useSelector((state) => state.searchResultsReducer)
	
	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'full_name',
			},
			{
				Header: 'Description',
				accessor: 'description',
			},
			{
				Header: 'Stars',
				accessor: 'stargazers_count',
			},
			{
				Header: 'Forks',
				accessor: 'forks_count',
			},
		],
		[]
	)
	
	return (
		<div>
			<Table
				columns={columns}
				data={repos}
			/>
		</div>
	)
}

export default SearchResults