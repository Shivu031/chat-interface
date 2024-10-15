import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const currentUser = useSelector((state) => state.chat.currentUser);
  return (
    <AppBar position="static" sx={{ backgroundColor: '#26a69a' }}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'Bold' }}>
            Chat App
            </Typography>
            <IconButton color="inherit" edge="end">
            <AccountCircleIcon sx={{fontSize: '40px'}}/>
            <Typography sx={{ marginLeft: '6px' }}>
                {currentUser}
            </Typography>
            </IconButton>
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;