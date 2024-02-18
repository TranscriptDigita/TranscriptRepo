import React, { useState } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../../../components';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    password: '',
    confirmedPassword: '',
  });

  const [isRegistered, setIsRegistered] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://dacs.onrender.com/api/v1/courier-service', {
        businessName: formData.name,
        emailAddress: formData.emailAddress,
        password: formData.password,
      });

      console.log('API Response:', response.data);

      // Handle success
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Additional logic for success if needed
      localStorage.setItem('newcourier', JSON.stringify(response.data));
      setIsRegistered(true);

    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      // Handle error, show an error message, etc.
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const getId = () => {
    const storedUserData = localStorage.getItem('newcourier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.logistic?._id;
    }
    return null;
  };

  const couId = getId();

  console.log("the id is", couId);

  const handleVerify = async () => {
    console.log("Verification Code to be sent:", verificationCode);
    console.log("pressed");
    try {
      const response = await axios.patch(
        `https://dacs.onrender.com/api/v1/courier-service/${couId}/verify`,
        { verificationCode: verificationCode.trim() }  // Trim the verificationCode
      );
      console.log('Verification Response:', response.data);

      if (response.data.message === 'successfully updated') {
        toast.error('Verification Failed!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Additional logic for success if needed
      } else {
        toast.success('Verification successful!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(`/courier/login`);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div>
      <Navbar/>
    
    <div className='flex flex-col gap-y-4 bg-white p-5 my-auto justify-center align-center mt-10'>
      <form className='flex flex-col'>
        <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0' style={{ alignSelf: 'center' }}>
          <div className='grid grid-cols-2 gap-y-4 gap-x-4 '>
            <TextField
              id='outlined-text-input'
              label='Company Name'
              type='text'
              name='name'
              className='col-span-2'
              value={formData.name}
              onChange={inputChange}
              disabled={isRegistered}
            />
            <TextField
              id='outlined-email-input'
              label='Email Address'
              type='email'
              name='emailAddress'
              className='col-span-2'
              value={formData.emailAddress}
              onChange={inputChange}
              disabled={isRegistered}
            />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              autoComplete='current-password'
              className='col-span-2'
              name='password'
              value={formData.password}
              onChange={inputChange}
              disabled={isRegistered}
            />
            <TextField
              id='outlined-password-input'
              label='Confirm Password'
              type='password'
              autoComplete='current-password'
              name='confirmedPassword'
              className='col-span-2'
              value={formData.confirmedPassword}
              onChange={inputChange}
              disabled={isRegistered}
            />
          </div>
          {!isRegistered ? (
            <Button
              variant='contained'
              className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          ) : (
            <>
              <TextField
                id='outlined-text-input'
                label='Verification Code'
                type='text'
                name='verificationCode'
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button
                variant='contained'
                className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
                onClick={handleVerify}
              >
                Verify
              </Button>
            </>
          )}
          <div className='text-right text-xs font-light'>
            <Link to='/courier/login'>Already have an account? Login</Link>
          </div>
          <Divider>or continue with</Divider>
          <Button
            variant='contained'
            className='bg-[#CCCCCC] text-slate-900 lowercase hover-bg-[#CCCCCC]'
          >
            Continue with Google
          </Button>
          <p className='text-xs text-center'>By clicking the sign-up button, you agree to our terms and policies.</p>
        </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
}

export default Signup;
