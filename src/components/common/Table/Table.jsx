import React from 'react'
import clsx from 'clsx'
import './Table.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const MyTable = (props) => {
  const {
    dataSource,
    columns,
    hover,
    className,
    onAction,
    hoverClickDisableAtRow
  } = props
  const { columnName, value } = hoverClickDisableAtRow || {}
  const checkColumnName = columnName.split('.')

  return (
    <div className={clsx('commonTableWrapper', className && className)}>
      <TableContainer>
        <Table aria-label='simple table' className='table'>
          <TableHead>
            <TableRow>
              {columns.map((item, index) => (
                <TableCell key={`${item.key}`} align={item.align}>
                  {item.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataSource.map((row, index) => {
              return (
                <TableRow
                  key={row.id || index}
                  className={clsx(
                    hover && 'row-hover',
                    hoverClickDisableAtRow &&
                      row[checkColumnName[0]][checkColumnName[1]] === value &&
                      'row-hover-disable'
                  )}
                >
                  {columns.map((itemRow, index) => (
                    <TableCell
                      key={itemRow.key + index}
                      align={columns[index]?.alignItems}
                      onClick={
                        onAction && columns[index]?.clickable
                          ? (e) =>
                              hoverClickDisableAtRow
                                ? row[checkColumnName[0]][
                                  checkColumnName[1]
                                ] !== value &&
                                  onAction(e, columns[index]?.dataIndex, row)
                                : onAction(e, columns[index]?.dataIndex, row)
                          : null
                      }
                    >
                      {itemRow.render
                        ? itemRow.render(row[itemRow.dataIndex], row)
                        : row[itemRow.dataIndex]}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default MyTable
