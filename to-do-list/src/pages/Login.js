import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Box, TextField, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {valid} from '../components/emailvalid';
import axiosInstance from '../components/axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!valid(email)){
        setError("Enter a Valid Email Address");
        return;
    
    }
    if(!password){
        setError("Enter the password")
    }
    setError("");
    try{
      const response = await axiosInstance.post("/Login", {
        email : email,
        password : password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        console.log('Attempting to navigate to /home...');
        navigate("/home", {replace :true});
      }
    }
    catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response?.data?.message || error );
      }
     
    }
  }
  return (
    <>
      <Navbar />
      <Box
        component='div'
        my={2}
        display='flex'
        justifyContent='center'
        alignItems='center'
        sx={{
          height: '70vh',
          width: '100vw',
          borderRadius: 5,
        }}
      >
        <Box
          component='div'
          my={2}
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='50%'
          height='80%'
          sx={{ p: 2, boxShadow: 3, m: 'auto', borderRadius: 2 }}
        >
          <form onSubmit={handleLogin}>
            <Typography variant='h4' align='center' gutterBottom>
              Login
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2, 
                width: '100%',
                alignItems: 'center', 
              }}
            >
              <TextField
                required
                id='outlined-required'
                label='Email'
                fullWidth
                value={email}
                onChange={handleEmailChange}
                sx={{
                  width: '400px', 
                  height: '60px', 
                }}
              />
              <TextField
                required
                id='outlined-password'
                label='Password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={toggleShowPassword} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width: '400px', 
                  height: '60px', 
                }}
              />
              {error && <p className='text-error'>{error}</p>}
            </Box>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{
                mt: 2,
                width: '400px',
                height: '60px', 
              }}
            >
              Login
            </Button>
            <p>
              New Here? <Link to='/SignUp'>SignUp</Link>
            </p>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default Login;
