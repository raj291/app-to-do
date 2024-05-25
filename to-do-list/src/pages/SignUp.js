import { Link , useNavigate} from 'react-router-dom';
import { Box, TextField, Typography, Button, IconButton, InputAdornment } from '@mui/material';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {valid} from '../components/emailvalid';
import axiosInstance from '../components/axios';
function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
      };
      const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    const handleSignup = async (e) =>{
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
      const response = await axiosInstance.post("/create-account", {
        fullName : name,
        email : email,
        password : password,
      });

      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
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
          height: '80vh',
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
        <form onSubmit={handleSignup}>
        <Typography variant='h4' align='center' gutterBottom>
              SignUp
        </Typography>
        <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2, // Space between the fields
                width: '100%',
                alignItems: 'center', // Center the content inside the Box
              }}
            >
        <TextField
                required
                id='outlined-required'
                label='Name'
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  width: '400px', 
                  height: '60px', 
                }}
              />
        <TextField
                required
                id='outlined-required'
                label='Email'
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Already Have an Account? <Link to='/Login'>Login</Link>
            </p>
            </Box>
        </form>
        </Box>
        </Box>
    </>
  )
}
export default SignUp;