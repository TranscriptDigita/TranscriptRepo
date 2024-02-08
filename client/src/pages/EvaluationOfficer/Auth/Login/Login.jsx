import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import StaffNavBar from '../../../../components/navbar/StaffNavBar';

function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const getToken = () => {
    const storedUserData = localStorage.getItem('stafftoken');
    if (storedUserData) {
        try {
            const userDataObject = storedUserData;
            return userDataObject;
        } catch (error) {
            console.error('Error parsing stored user data:', error);
            return null;
        }
    }
    return null;
};

const staffToken = getToken();


  const handleLogin = async () => {
    try {
      const response = await Axios.post('https://dacs.onrender.com/api/v1/staff/login', {
        emailAddress: email,
        password: password,
      });
  
      // Extract role and staff/institution ID from the response
      const { role, _id: staffId, institution: institutionId } = response.data.staff;
  
      // Store the response in localStorage
      localStorage.setItem('stafftoken', response.data.token);
      localStorage.setItem('staff', JSON.stringify(response.data.staff));
  
      // Navigate based on the role
      if (role === 'Evaluation Officer') {
        navigate(`/evaluationofficer/${staffId}/dashboard`);
      } else if (role === 'Auditor') {
        navigate(`/auditor/${institutionId}/${staffToken}/auditordashboard`);
      } else {
        // Handle other roles as needed
        console.error('Unknown role:', role);
      }
    } catch (error) {
      // Handle login error here
      console.error('Login error:', error);
      setError('Invalid email or password');
      setOpen(true);
    }
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <StaffNavBar />
      <div className='w-full flex flex-col justify-center items-center'>
        <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
          <div className='flex flex-col gap-y-4 mt-20'>
            <label>Email</label>
            <TextField
              id="outlined-text-input"
              label=""
              type="text"
              name=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <TextField
              id="outlined-password-input"
              label=""
              type="password"
              autoComplete="current-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-right text-xs font-light'>
            <Link to='/forgot-password'>Forgot Password?</Link>
          </div>
          <Button
            variant="contained"
            className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>{error}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Login;
