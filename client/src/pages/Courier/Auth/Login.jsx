import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../../components';

function Login() {


  useEffect(() => {
    const keywordsMetaTag = document.createElement('meta');
    keywordsMetaTag.name = 'keywords';
    keywordsMetaTag.content = 'sign up to loumni, sign in to loumni, loumni login, create account, login to my loumni account, create loumni account, transcript, university, tertiary institution, Nigeria academic system, alumni, Nigeria institution, certificate, certificate processing, request for transcript, transcript processing system, academic records system, academy document, process academy document, request academy document, online transcript request system, centralized academy system, certificate system, transcript request';

    const descriptionMetaTag = document.createElement('meta');
    descriptionMetaTag.name = 'description';
    descriptionMetaTag.content = "Loumni is a nationwide academy document processing system. With loumni, alumni/student can request for academic document such as Certificate, transcript, statement of result from their comfort zone and it'll delivered with ease.";

    document.head.appendChild(keywordsMetaTag);
    document.head.appendChild(descriptionMetaTag);

    return () => {
      // Clean up the added meta tags when the component unmounts
      document.head.removeChild(keywordsMetaTag);
      document.head.removeChild(descriptionMetaTag);
    };
  }, []);


  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://dacs.onrender.com/api/v1/courier-service/login', {
        emailAddress: formData.emailAddress,
        password: formData.password,
      });
  
      console.log('Login API Response:', response.data);
  
      // Store the entire API response in local storage under the key 'courier'
      localStorage.setItem('courier', JSON.stringify(response.data));
  
      // Handle successful login
      window.location.href = `/courierloginverification/${response.data.logistic._id}`;
  
    } catch (error) {
      console.error('Login API Error:', error.response ? error.response.data : error.message);
      // Handle login error, show an error message, etc.
      setErrorMessage('Login failed. Please check your credentials and try again.');
    }
  };
  

  return (

    <div>
      <Navbar/>
    
    <div className="w-full flex flex-col justify-center items-center mt-10">
      
      <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
        <div className="flex flex-col gap-y-4">
        <p style={{ fontWeight: 'bold', color: '#6B3FA0', fontSize: '2rem' }}>Login </p>
          <TextField
            id="outlined-email-input"
            label="Email Address"
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="text-right text-xs font-light">
          <Link to="#">Forgot Password?</Link>
        </div>
        <Button
          variant="contained"
          className="bg-[#6B3FA0] hover:bg-[#6B3FA0] "
          onClick={handleLogin}
        >
          Sign in
        </Button>
        <Link to={`/courier/signup`}>
          <Button variant="text" className="bg-[#CCCCCC] text-slate-900 hover:bg-[#CCCCCC]" style={{ width: '100%' }}>
            <span style={{ textAlign: 'center', color: 'white' }}>
              Create Account
            </span>
          </Button>
        </Link>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      </div>
    </div>
    </div>
  );
}

export default Login;
