import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Nav = ({user}) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#80cbc4', borderRadius: '10px' }}>
        <Toolbar>
            <IconButton color="inherit">
                <AccountCircleIcon sx={{fontSize: '30px'}}/>
                <Typography sx={{ marginLeft: '6px' }}>
                    {user}
                </Typography>
            </IconButton>
        </Toolbar>
    </AppBar>
  );
};

export default Nav;