import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginInstitution } from '../../../../features/auth/institutionSlice';
import { Spinner } from '../../../../components';
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    universityName: '',
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

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.institution);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData); // Log all form data

    const { emailAddress, password } = formData;
    const userData = {
      emailAddress,
      password,
    };

    try {
      const response = await dispatch(loginInstitution(userData)); // Dispatch the loginInstitution action

      // Handle success or error logic based on the state
      if (isSuccess) {
        // Add your logic for a successful login
        console.log(formData); 
        console.log('Login successful');
      } else if (isError) {
        // Handle API errors
        console.error('API Error:', message);
      }
    } catch (error) {
      // Handle network errors
      console.error('API Error:', error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
        {isLoading ? <Spinner /> : ``}
        <div className="flex flex-col gap-y-4">
          <TextField
            id="outlined-text-input"
            label="University Name"
            type="text"
            name="universityName"
            value={formData.universityName}
            onChange={inputChange}
          />
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
        <div className="text-right text-xs font-light">
          <Link>Forgot Password?</Link>
        </div>
        <Button
          variant="contained"
          className="bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase"
          onClick={handleSubmit}
        >
          Sign in
        </Button>
        <Link to={`/institution/signup`}>
        <Button variant="text" className="bg-[#CCCCCC] text-slate-900 hover:bg-[#CCCCCC]" style={{width:'100%'}}>
            <span style={{ textAlign: 'center', color: 'white' }}>
            Create Account
            </span>
        </Button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
