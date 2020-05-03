import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Pagination.sass'
import { useDispatch, useSelector } from 'react-redux'
import { perPageChange, currentPageChange } from '../../redux/pagination'

const Pagination = ({
	perPageOptions
}) => {
	const dispatch = useDispatch()
	const { perPage, currentPage } = useSelector((state) => state.paginationReducer)
	const { reposCount, repos } = useSelector((state) => state.searchResultsReducer)
	const totalPagesCount = Math.ceil(reposCount / perPage)
	
	function handlePageChange(e) {
		let val = e.target.value
		if (val > totalPagesCount) val = totalPagesCount
		if (val !== '' && val < 1) val = 1
		dispatch(currentPageChange(val))
	}
	
	return (
		<React.Fragment>
			{repos.length ?
			<div>
				<div>
					<span>Show on page:</span>
					<select
						value={perPage}
						onChange={(e) => dispatch(perPageChange(e.target.value))}
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
					<span>Page</span>
					
					<input
						type="number"
						min={1}
						max={totalPagesCount}
						value={currentPage}
						onChange={handlePageChange}
					/>
					
					<span>of {totalPagesCount}</span>
				</div>
			</div> :
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