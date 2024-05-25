import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const currentPath = location.pathname;

  const handleNavigate = (path) => {
    navigate(path);
  };

  const onLogout = () => {
    localStorage.removeItem('token');
    handleNavigate("/Login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To-do List
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={() => handleNavigate('/home')} disabled={currentPath === '/home'}>
              Home
            </Button>
          )}
          {!isLoggedIn && (
            <>
              <Button color="inherit" onClick={() => handleNavigate('/Login')} disabled={currentPath === '/Login'}>
                Login
              </Button>
              <Button color="inherit" onClick={() => handleNavigate('/SignUp')} disabled={currentPath === '/SignUp'}>
                Sign Up
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button variant='outlined' color='inherit' sx={{ fontWeight: 'bold', color: '#E49B0F' }} onClick={onLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;