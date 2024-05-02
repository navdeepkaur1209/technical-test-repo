import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import { ArrowRightIcon } from '@mui/x-date-pickers';

function createData(sNo, description, add, cost, clientShare, neighbour1Share, neighbour2Share) {
  return { sNo, description, add, cost, clientShare, neighbour1Share, neighbour2Share };
}

export default function OptionsTable() {
  const [options, setOptions] = React.useState(1);
  const rows = [
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          1
        </Typography>
      </>,
      <>
        <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 650 }}>
          <MenuItem value={1}>HEIGHT CHANGE: 1.65m, 1.95m, 2.1m (dble plinth), 2.25m, 2.55m, 2.7m (dble plinth)</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          2
        </Typography>
      </>,
      <>
        <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 650 }}>
          <MenuItem value={1}>COLORBOND: Metline Trimclad Miniscreen Height</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          3
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>THICKER PLINTHBOARD: 150X38mm RECOMMENDED or 200x50mm (screw fixed with extra concrete)</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          4
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>Add 577mm Bullnose (thick slats) 65mm Sq. lattice on full posts + extra top rail support</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          5
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>Add 90mm x 45mm Gable (lip) t/pine Capping to fence top</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          6
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>LEVEL CONSTRUCTION: Step panels or level Construction (_____ mm to _____mm approx)</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          7
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>
                Change CCA treated pine plinth, rails and palings only to Ecowood or ACQ (arsenic free) treated pine
              </MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          8
        </Typography>
      </>,
      <>
        <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 650 }}>
          <MenuItem value={1}>ACCOUSTIC STYLE: Change plinth to 200x50mm and palings to 25mm thick at tighter 20mm spaces</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          9
        </Typography>
      </>,
      <>
        <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 650 }}>
          <MenuItem value={1}>
            EXCAVATION INSURANCE: Third party service locator provided to mark underground services within your property, minimising risk of
            damage
          </MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          400
        </Typography>
      </>,
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          10
        </Typography>
      </>,
      <>
        <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 650 }}>
          <MenuItem value={1}>
            GATE: mm open x mm high on x mm posts Cover - (inc 30mm sq Galv Steel Frame, black ring latch and padbolt).
          </MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          11
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>LOKK - outdoor key gate deadlock</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          12
        </Typography>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item sm={'auto'}>
            <Select value={options} onChange={(e) => setOptions(e.target.value)} sx={{ width: 577 }}>
              <MenuItem value={1}>
                PAINT BOTTOM OF POSTS (800mm) using water based bitumen paint to help prevent moisture damage/rotting posts
              </MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item sm={'auto'}>
            <OutlinedInput sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      '',
      '',
      '',
      '',
      ''
    ),
    createData(
      '',
      '',
      <>
        <Typography variant="h6" fontWeight={700} sx={{ whiteSpace: 'nowrap' }}>
          Total Inc GST
        </Typography>
      </>,
      '',
      '',
      '',
      ''
    )
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <InputLabel>S No.</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>DESCRIPTION</InputLabel>
            </TableCell>
            <TableCell align="center">
              <Grid container alignItems={'center'} justifyContent={'center'} flexWrap={'nowrap'}>
                <InputLabel>ADD</InputLabel>
                <ArrowRightIcon />
              </Grid>
            </TableCell>
            <TableCell align="center">
              <InputLabel>COST</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>
                Client <br /> Share
              </InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>
                Neighbour 1 <br /> Share
              </InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>
                Neighbour 2 <br /> Share
              </InputLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.sNo}>
              <TableCell component="th" scope="row" sx={{ border: '1px solid #f0f0f0' }}>
                {row.sNo}
              </TableCell>
              <TableCell align="left" sx={{ border: '1px solid #f0f0f0' }}>
                {row.description}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.add}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.cost}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.clientShare}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.neighbour1Share}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.neighbour2Share}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
