import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

function createData(item, product, quantity, cost, total) {
  return { item, product, quantity, cost, total };
}

export default function LabourItems() {
  const [dropdown, setDropdown] = React.useState(1);
  const rows = [
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Build Fence Paling 1950mm Over 16m</MenuItem>
          <MenuItem value={2}>Good Neighbour 200 x 50mm Treated Pine Sleeper 2.4m</MenuItem>
          <MenuItem value={3}>Good Neighbour Alumwall Sleeper/Plinth 2385m</MenuItem>
          <MenuItem value={4}>Good Neighbour CGI (Corruqated) Double Gate (Screen Top) 3220mm x 1800mm</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$15.60" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$312.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Typography variant="h6">Demolish Only Ferncer</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={2}>Good Neighbour 200 x 50mm Treated Pine Sleeper 2.4m</MenuItem>
          <MenuItem value={3}>Good Neighbour Alumwall Sleeper/Plinth 2385m</MenuItem>
          <MenuItem value={4}>Good Neighbour CGI (Corruqated) Double Gate (Screen Top) 3220mm x 1800mm</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="84%" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc. x posts</MenuItem>
          <MenuItem value={2}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={3}>Good Neighbour 200 x 50mm Treated Pine Sleeper 2.4m</MenuItem>
          <MenuItem value={4}>Good Neighbour Alumwall Sleeper/Plinth 2385m</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="50" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="84%" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$42.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Special construction against Wall</MenuItem>
          <MenuItem value={2}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc. x posts</MenuItem>
          <MenuItem value={3}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={4}>Good Neighbour 200 x 50mm Treated Pine Sleeper 2.4m</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="84%" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Special construction against Shed</MenuItem>
          <MenuItem value={2}>Special construction against Wall</MenuItem>
          <MenuItem value={3}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc. x posts</MenuItem>
          <MenuItem value={4}>dig / clear ground level for plinthboard</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="84%" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Typography variant="h6">LABOUR</Typography>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} fullWidth>
          <MenuItem value={1}>Special construction against trees close to boundary</MenuItem>
          <MenuItem value={2}>Special construction against Wall</MenuItem>
          <MenuItem value={3}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc. x posts</MenuItem>
          <MenuItem value={4}>dig / clear ground level for plinthboard</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="84%" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Grid container spacing={2} alignItems={'center'}>
          <Grid item xs="auto">
            <Typography variant="h6" fontWeight={700}>
              LABOUR
            </Typography>
          </Grid>
          <Grid item xs="auto">
            <OutlinedInput fullWidth placeholder="$297.36" sx={{ width: 95 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      <>
        <Typography variant="h6">TOTAL LABOUR</Typography>
      </>,
      <>
        <Typography variant="h5">$354.00</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6" fontWeight={700}>
          DEMO/REMOVAL
        </Typography>
      </>,
      <>
        <Typography variant="h6" textAlign={'center'}>
          $400
        </Typography>
      </>,
      '',
      <>
        <Typography variant="h6">75%</Typography>
      </>,
      <>
        <Typography variant="h5">$300.00</Typography>
      </>
    ),
    createData(
      <>
        <Typography variant="h6">SERVICE LOCATOR</Typography>
      </>,
      '',
      '',
      <>
        <Typography variant="h6">80.70%</Typography>
      </>,
      <>
        <Typography variant="h5"></Typography>
      </>
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel>Item</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>PRODUCT</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>QTY</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>COST</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>TOTAL</InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell align="center">{row.quantity}</TableCell>
              <TableCell align="center">{row.cost}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
