import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';

function createData(title, description, meters, cost, clientShare, neighbour1Share, neighbour2Share) {
  return { title, description, meters, cost, clientShare, neighbour1Share, neighbour2Share };
}

export default function ExtraLabourTable() {
  const [plinthline, setPlinthline] = React.useState(1);
  const [concrete, setConcrete] = React.useState(1);
  const [pailingHeight, setPailingHeight] = React.useState(5);
  const rows = [
    createData(
      <>
        <Select value={plinthline} placeholder="pailingHeight" onChange={(e) => setPlinthline(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Plinthline</MenuItem>
          <MenuItem value={2}>Post</MenuItem>
          <MenuItem value={3}>Posts</MenuItem>
          <MenuItem value={4}>Repair</MenuItem>
          <MenuItem value={5}>Rows</MenuItem>
          <MenuItem value={6}>Service Locator</MenuItem>
          <MenuItem value={7}>Various</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 564 }}
        >
          <MenuItem value={5}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={10}>Option 2</MenuItem>
          <MenuItem value={15}>Option 3</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $300
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $100
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $100
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $100
        </Typography>
      </>
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Concrete</MenuItem>
          <MenuItem value={2}>Concrete Removal</MenuItem>
          <MenuItem value={3}>Construction</MenuItem>
          <MenuItem value={4}>Cover</MenuItem>
          <MenuItem value={5}>Demolish Remove</MenuItem>
          <MenuItem value={6}>Extra Material</MenuItem>
          <MenuItem value={7}>Hazards</MenuItem>
          <MenuItem value={8}>Labour Charges</MenuItem>
        </Select>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item md={10}>
            <Select
              id="createdBy-select"
              value={pailingHeight}
              placeholder="pailingHeight"
              onChange={(e) => setPailingHeight(e.target.value)}
              sx={{ width: 500 }}
            >
              <MenuItem value={5}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc</MenuItem>
              <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
              <MenuItem value={15}>Option 3</MenuItem>
              <MenuItem value={20}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item md={2}>
            <OutlinedInput fullWidth placeholder="5" sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $600
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $200
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $200
        </Typography>
      </>,
      <>
        <Typography variant="h6" sx={{ whiteSpace: 'nowrap' }}>
          $200
        </Typography>
      </>
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Construction</MenuItem>
          <MenuItem value={2}>Cover</MenuItem>
          <MenuItem value={3}>Demolish Remove</MenuItem>
          <MenuItem value={4}>Extra Material</MenuItem>
          <MenuItem value={5}>Hazards</MenuItem>
          <MenuItem value={6}>Labour Charges</MenuItem>
          <MenuItem value={7}>Length</MenuItem>
          <MenuItem value={7}>Lifetime Pine</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 564 }}
        >
          <MenuItem value={5}>Special construction against Wall</MenuItem>
          <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={15}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc</MenuItem>
          <MenuItem value={20}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Construction</MenuItem>
          <MenuItem value={2}>Cover</MenuItem>
          <MenuItem value={3}>Demolish Remove</MenuItem>
          <MenuItem value={4}>Extra Material</MenuItem>
          <MenuItem value={5}>Hazards</MenuItem>
          <MenuItem value={6}>Labour Charges</MenuItem>
          <MenuItem value={7}>Length</MenuItem>
          <MenuItem value={7}>Lifetime Pine</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 564 }}
        >
          <MenuItem value={5}>Special construction against Wall</MenuItem>
          <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={15}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc</MenuItem>
          <MenuItem value={20}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Construction</MenuItem>
          <MenuItem value={2}>Cover</MenuItem>
          <MenuItem value={3}>Demolish Remove</MenuItem>
          <MenuItem value={4}>Extra Material</MenuItem>
          <MenuItem value={5}>Hazards</MenuItem>
          <MenuItem value={6}>Labour Charges</MenuItem>
          <MenuItem value={7}>Length</MenuItem>
          <MenuItem value={7}>Lifetime Pine</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 564 }}
        >
          <MenuItem value={5}>Special construction against Wall</MenuItem>
          <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={15}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc</MenuItem>
          <MenuItem value={20}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Demolish Remove</MenuItem>
          <MenuItem value={2}>Clearing</MenuItem>
          <MenuItem value={3}>Concrete</MenuItem>
          <MenuItem value={4}>Concrete Removal</MenuItem>
          <MenuItem value={5}>Construction</MenuItem>
          <MenuItem value={6}>Cover</MenuItem>
          <MenuItem value={7}>Demolish Remove</MenuItem>
          <MenuItem value={8}>Extra Material</MenuItem>
        </Select>
      </>,
      <>
        <Grid container columnSpacing={3}>
          <Grid item md={10}>
            <Select
              id="createdBy-select"
              value={pailingHeight}
              placeholder="pailingHeight"
              onChange={(e) => setPailingHeight(e.target.value)}
              sx={{ width: 500 }}
            >
              <MenuItem value={5}>Demolish and Remove old timber fence (1m-2.1m high)</MenuItem>
              <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
              <MenuItem value={15}>Option 3</MenuItem>
              <MenuItem value={20}>Option 4</MenuItem>
            </Select>
          </Grid>
          <Grid item md={2}>
            <OutlinedInput fullWidth placeholder="5" sx={{ width: 50, input: { textAlign: 'center' } }} />
          </Grid>
        </Grid>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
      </>,
      '',
      '',
      '',
      ''
    ),
    createData(
      <>
        <Select value={concrete} placeholder="pailingHeight" onChange={(e) => setConcrete(e.target.value)} sx={{ width: 130 }}>
          <MenuItem value={1}>Clearing</MenuItem>
          <MenuItem value={2}>Concrete</MenuItem>
          <MenuItem value={3}>Concrete Material</MenuItem>
          <MenuItem value={4}>Construction</MenuItem>
          <MenuItem value={5}>Cover</MenuItem>
          <MenuItem value={6}>Demolish Remove</MenuItem>
          <MenuItem value={7}>Extra Material</MenuItem>
          <MenuItem value={8}>Hazards</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 564 }}
        >
          <MenuItem value={5}>Trim & remove folaige/small branches from fenceline to ground level</MenuItem>
          <MenuItem value={10}>dig / clear ground level for plinthboard</MenuItem>
          <MenuItem value={15}>Special Score/Cut concrete for posts (cement patch only) Owners to replace pavers etc</MenuItem>
          <MenuItem value={20}>Option 4</MenuItem>
        </Select>
      </>,
      <>
        <Select
          id="createdBy-select"
          value={pailingHeight}
          placeholder="pailingHeight"
          onChange={(e) => setPailingHeight(e.target.value)}
          sx={{ width: 130 }}
        >
          <MenuItem value={5}>Shared Cost</MenuItem>
          <MenuItem value={10}>Neighbor Cost</MenuItem>
          <MenuItem value={15}>Neigbor 4 Share</MenuItem>
          <MenuItem value={20}>TP 2 METRE Code 1</MenuItem>
        </Select>
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
              <InputLabel>TITLE</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>DESCRIPTION</InputLabel>
            </TableCell>
            <TableCell align="center">
              <InputLabel>METRES</InputLabel>
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
            <TableRow key={row.title}>
              <TableCell component="th" scope="row" sx={{ border: '1px solid #f0f0f0' }}>
                {row.title}
              </TableCell>
              <TableCell align="left" sx={{ border: '1px solid #f0f0f0' }}>
                {row.description}
              </TableCell>
              <TableCell align="center" sx={{ border: '1px solid #f0f0f0' }}>
                {row.meters}
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
