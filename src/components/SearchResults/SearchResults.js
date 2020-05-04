import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import Table from '../Table/Table'
import Preloader from '../Preloader/Preloader'
import './SearchResults.sass'

const SearchResults = () => {
	const { repos, currentRequestKey, loading, error } = useSelector((state) => state.searchResults)
	const currentResults = (repos[currentRequestKey] && repos[currentRequestKey].items)
	
	const columns = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'full_name',
			},
			{
				Header: 'Description',
				accessor: 'description',
				Cell: ({ value }) => {
					if (value) {
						return value.length > 500 ? `${value.slice(0, 500)}...` : value
					}
					return '---'
				}
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
		<section className={'search-results'}>
			{loading ?
				<Preloader /> :
				error ?
					<p className={'search-results__error'}>{error}</p> :
					currentResults ?
						currentResults.length ?
							<div className={'search-results__table-wrap'}>
								<Table
									columns={columns}
									data={currentResults || []}
								/>
							</div> :
							<p className={'search-results__no-data'}>--- No data ---</p> :
						''
			}
		</section>
	)
}

export default SearchResults