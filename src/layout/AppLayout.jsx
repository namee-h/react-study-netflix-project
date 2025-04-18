import React from 'react';
import netflixLogo from '../assets/logo.png'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}));

export default function AppLayout() {
    const navItems=[
        {label:'Home',path:'/'},
        {label:'Movies',path:'/movies'},
    ]
    const navigate = useNavigate()
    const moveToHome=()=>{
        navigate('/')

    }
  return (
    // className={'borders'}
    <div>
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundColor:'#141414'}}>
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{display:'flex', alignItems:'center',gap:'30px' }}>
                <img onClick={moveToHome}
                    src={netflixLogo}
                    alt="Netflix Logo"
                    style={{ height: '80px',cursor:'pointer' }}
                />
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map(({label,path}) => (
                        <Button key={label} component={Link} to={path} sx={{ color: '#fff' }}>
                            {label}
                        </Button>
                        ))}
                    </Box>
                </Box>
            <Box sx={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Button variant="outlined" color="warning">
                  Search
                </Button>
            </Box>
            </Toolbar>
        </AppBar>
        </Box>
        <Outlet/>
    </div>
  );
}

