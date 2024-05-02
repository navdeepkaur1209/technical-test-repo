import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { Typography } from '@mui/material';
import { quotesAmmount } from 'store/reducers/quotes';
import { useDispatch } from 'store';

const TotalTable = ({ total, includeOptions, neighbours }) => {
  const dispatch = useDispatch();
  const dataTotal = useMemo(() => {
    const computeTotal = {
      cost: 0,
      client: 0,
      neighbours: Array(neighbours ? neighbours : 0).fill(0)
    };

    for (const [k, v] of Object.entries(total)) {
      if (!includeOptions && k === 'OPTIONALS') {
        continue;
      }

      computeTotal.cost += parseFloat(v.cost);
      computeTotal.client += parseFloat(v.client);
      for (let i = 0; i < computeTotal.neighbours.length; i++) {
        computeTotal.neighbours[i] += i < total[k].neighbours.length ? parseFloat(total[k].neighbours[i]) : 0;
      }
    }

    return computeTotal;
  }, [total, includeOptions, neighbours]);

  dispatch(quotesAmmount(dataTotal));
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell align="right" sx={{ border: '1px solid #f0f0f0' }}>
              <Typography variant="h6" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
                {includeOptions ? 'Total Inc GST' : 'Sub Total Inc GST'}
              </Typography>
            </TableCell>
            <TableCell align="center" width={120} sx={{ border: '1px solid #f0f0f0' }}>
              ${Number(dataTotal.cost).toFixed(2)}
            </TableCell>
            <TableCell align="center" width={120} sx={{ border: '1px solid #f0f0f0' }}>
              ${Number(dataTotal.client).toFixed(2)}
            </TableCell>
            {Array(dataTotal.neighbours.length)
              .fill(0)
              .map((n, i) => (
                <TableCell key={['neighbour', i + 1].join('')} align="center" width={120} sx={{ border: '1px solid #f0f0f0' }}>
                  ${Number(dataTotal.neighbours[i]).toFixed(2)}
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

TotalTable.propTypes = {
  total: PropTypes.any,
  includeOptions: PropTypes.bool,
  neighbours: PropTypes.number
};

export default TotalTable;
