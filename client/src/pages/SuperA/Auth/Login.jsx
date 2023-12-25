import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { Spinner } from '../../../components';

function Login() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  const navigate = useNavigate();

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make the API request
      const response = await fetch('https://dacs.onrender.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      // Parse the response
      const data = await response.json();
  
      // Check if login was successful
      if (response.ok) {
        // Store the API response in local storage
        localStorage.setItem('SuperAdmin', JSON.stringify(data));
  
        // Access the admin._id and token from the API response
        const adminId = data.admin?._id;
        const token = data.token;
  
        // Navigate to the '/superadmin/:id/:token/createadmin' route
        navigate(`/superadmin/${adminId}/${token}/createadmin`);
      } else {
        // Handle login failure, show error message, etc.
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
        {/* Your spinner component */}
        <Spinner />
        <div className="flex flex-col gap-y-4">
          <TextField
            id="outlined-email-input"
            label="Email Address"
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={inputChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            value={formData.password}
            onChange={inputChange}
          />
        </div>
        <Button
          variant="contained"
          className="bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase"
          onClick={handleSubmit} // Call your handleSubmit function on button click
        >
          Sign in
        </Button>
        <Link to={`/institution/signup`}></Link>
      </div>
    </div>
  );
}

export default Login;