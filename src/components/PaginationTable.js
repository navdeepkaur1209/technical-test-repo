import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Link } from '@mui/material';

// third-party
import { useTable, useFilters, usePagination } from 'react-table';

// assets
import { DeleteOutlined, EditFilled, DownloadOutlined } from '@ant-design/icons';

// project import
import { TablePagination } from 'components/third-party/ReactTable';

// ==============================|| REACT TABLE ||============================== //

function PaginationTable({ columns, data, top, actions }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    usePagination
  );
  const { pathname } = useLocation();

  const urlItem = useMemo(() => {
    return pathname.split('/');
  }, [pathname]);

  useEffect(() => {
    if (urlItem.length > 4 && urlItem.includes('supplier-order')) {
      window.scrollTo({ top: 2000, behavior: 'smooth' });
    }
  }, [urlItem]);

  return (
    <Stack>
      {top && (
        <Box sx={{ p: 2 }}>
          <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
        </Box>
      )}

      <Table {...getTableProps()}>
        <TableHead sx={{ borderTopWidth: top ? 2 : 1 }}>
          {headerGroups.map((headerGroup, index) => (
            <TableRow key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <TableCell key={i} {...column.getHeaderProps([{ className: column.className }])}>
                  {column.render('Header')}
                </TableCell>
              ))}
              {actions ? <TableCell key="actions">Actions</TableCell> : ''}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow key={i} {...row.getRowProps()}>
                {row.cells.map((cell, index) => (
                  <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                    {cell.render('Cell')}
                  </TableCell>
                ))}
                {actions ? (
                  <TableCell key={i}>
                    {actions.edit ? (
                      <Link
                        style={{ marginRight: 10, cursor: 'pointer' }}
                        onClick={() => {
                          actions.edit.cb(row.values[actions.edit.id]);
                        }}
                      >
                        <EditFilled />
                      </Link>
                    ) : (
                      ''
                    )}
                    {actions.download ? (
                      <Link
                        style={{ marginRight: 10, cursor: 'pointer' }}
                        onClick={() => {
                          actions.download.cb(row.values[actions.download.id]);
                        }}
                      >
                        <DownloadOutlined />
                      </Link>
                    ) : (
                      ''
                    )}
                    {actions.delete ? (
                      <Link
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          actions.delete.cb(row.values[actions.delete.id]);
                        }}
                      >
                        <DeleteOutlined />
                      </Link>
                    ) : (
                      ''
                    )}
                  </TableCell>
                ) : (
                  ''
                )}
              </TableRow>
            );
          })}

          {!top && (
            <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={7}>
                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}

PaginationTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  top: PropTypes.bool,
  actions: PropTypes.object
};

export default PaginationTable;
