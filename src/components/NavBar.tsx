import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IoGitBranchOutline, IoCheckboxSharp } from "react-icons/io5";
import { IoIosHelpCircle } from "react-icons/io";
import ButtonGroup from '@mui/material/ButtonGroup';
import { Checkbox, FormControlLabel, Switch } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Tic-Tac-Toe</Typography>
            {/* <Button color="inherit" startIcon={<IoGitBranchOutline />}>View Source</Button> */}
            <ButtonGroup variant="contained" aria-label="Basic button group" disableElevation>
                <Button color="primary" startIcon={<IoGitBranchOutline />}>View Source</Button>
                <Button color="primary" startIcon={<IoIosHelpCircle />}>How To Play</Button>
                <FormControlLabel style={{paddingLeft: '12px'}} label="Enable/Disable AI" control={<Switch color='info' />}></FormControlLabel>
            </ButtonGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}