import React  from 'react'
import PropTypes from 'prop-types'
import './Pagination.sass'
import { useDispatch, useSelector } from 'react-redux'
import { perPageChange, currentPageChange } from '../../redux/actions/pagination.js'

const Pagination = ({
	perPageOptions
}) => {
	const dispatch = useDispatch()
	const { perPage, currentPage } = useSelector((state) => state.pagination)
	const { repos, currentRequestKey, loading, error } = useSelector((state) => state.searchResults)
	const currentResults = repos[currentRequestKey]
	const totalPagesCount = Math.ceil(currentResults && (currentResults.reposCount / perPage))
	
	function handlePageChange(e) {
		let val = e.target.value
		if (val > totalPagesCount) val = totalPagesCount
		if (val !== '' && val < 1) val = 1
		dispatch(currentPageChange(val))
	}
	
	return (
		<React.Fragment>
			{(!error &&
			currentResults &&
			currentResults.items &&
			currentResults.items.length) ?
				<section className={'pagination'}>
					<div>
						<span className={'pagination__label'}>Show on page:</span>
						<select
							className={'pagination__select'}
							value={perPage}
							onChange={(e) => dispatch(perPageChange(e.target.value))}
							disabled={loading}
						>
							{perPageOptions.map((item, key) => {
								return (
									<option value={item} key={key}>
										{item}
									</option>
								)
							})}
						</select>
					</div>
					
					<div>
						<span className={'pagination__label'}>Page</span>
						<input
							className={'pagination__input'}
							type="number"
							min={1}
							max={totalPagesCount}
							value={currentPage}
							onChange={handlePageChange}
							disabled={loading}
						/>
						{totalPagesCount &&
						<span className={'pagination__label'}>of {totalPagesCount}</span>}
					</div>
				</section> :
				''}
		</React.Fragment>
	)
}

Pagination.propTypes = {
	perPageOptions: PropTypes.array
}

Pagination.defaultProps = {
	perPageOptions: [10, 20, 30, 40, 50]
}

export default Pagination