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

export default function FenceItems() {
  const [dropdown, setDropdown] = React.useState(1);
  const rows = [
    createData(
      <>
        <Typography variant="h6" sx={{ width: 200 }}>
          FENCE
        </Typography>
      </>,
      <>
        <Typography variant="h6">TP 1.65 METRE Code 1 COST</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="20" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$41.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$820.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Post</MenuItem>
          <MenuItem value={2}>Rail</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 715 }}>
          <MenuItem value={1}>Hardwood 125 x 75mm 2.7m (starter)</MenuItem>
          <MenuItem value={2}>Good Neighbour 200 x 50mm Treated Pine Sleeper 2.4m</MenuItem>
          <MenuItem value={3}>Good Neighbour Alumwall Sleeper/Plinth 2385m</MenuItem>
          <MenuItem value={4}>Good Neighbour CGI (Corruqated) Double Gate (Screen Top) 3220mm x 1800mm</MenuItem>
        </Select>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="1" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$55.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$55.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Plinth</MenuItem>
          <MenuItem value={2}>Rail</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Rail</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Lattice</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Capping</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Cover</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Bracket</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      '',
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Various</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6">Cement 20kg</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$7.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Various</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6">Concrete 20kg</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$7.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Select value={dropdown} onChange={(e) => setDropdown(e.target.value)} sx={{ width: 200 }}>
          <MenuItem value={1}>Delivery</MenuItem>
          <MenuItem value={2}>Plinth</MenuItem>
          <MenuItem value={3}>Small Jobs</MenuItem>
          <MenuItem value={4}>Starter Post</MenuItem>
          <MenuItem value={5}>Steel Channels</MenuItem>
          <MenuItem value={6}>Various</MenuItem>
          <MenuItem value={7}>Wire Gates</MenuItem>
          <MenuItem value={8}>Z Pricing For Client</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6">Standard</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="" sx={{ width: 60 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$7.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$0.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
      </>
    ),
    createData(
      <>
        <Grid container spacing={2} alignItems={'center'} sx={{ width: 200 }}>
          <Grid item xs="auto">
            <Typography variant="h6">POST REQUIRED</Typography>
          </Grid>
          <Grid item xs="auto">
            <OutlinedInput fullWidth placeholder="9" sx={{ width: 50 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      <>
        <Typography variant="h6">TOTAL FENCE Material</Typography>
      </>,
      <>
        <OutlinedInput fullWidth placeholder="$875.00" sx={{ width: 90 }} inputProps={{ min: 0, style: { textAlign: 'center' } }} />
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
