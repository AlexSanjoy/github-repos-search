import PropTypes from 'prop-types'
import React  from 'react'
import { useTable, useSortBy } from 'react-table'
import './Table.sass'

const Table = ({
  className,
  columns,
  data,
  fetching,
  fetchingErrors
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows
  } = useTable(
    { columns, data },
    useSortBy
  )

  return (
    <div className={'table-wrap'}>
      {/*{fetching &&*/}
      {/*  <Preloader relative={true} />}*/}
      {fetchingErrors ?
        // <Alert message={fetchingErrors} type={'error'} /> :
        '' :
        data.length ?
          <table
            className={'table ' + (className ? className : '')}
            {...getTableProps()}
          >
            <thead className={'table-thead'}>
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} className={'table__tr'} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th key={i} className={'table__th'} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <span className={"table__th-inner"}>
                    {column.render('Header')}
                  </span>
                  </th>
                ))}
              </tr>
            ))}
            </thead>
          
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr key={i} className={'table__tr'} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td key={i} className={'table__td'} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            </tbody>
          </table> :
          <span className={'table__no-data'}>No data</span>
      }
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  className: PropTypes.string,
  fetching: PropTypes.bool,
  fetchingErrors: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]),
}

export default Table
