import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginInstitution } from '../../../../features/auth/institutionSlice';
import { Spinner } from '../../../../components';
import { useNavigate } from "react-router-dom";
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
  
    const { emailAddress, password } = formData;
    const userData = {
      emailAddress,
      password,
    };
  
    try {
      const response = await dispatch(loginInstitution(userData));
  
      console.log('API Response:', response);
  
      if (response.type === 'institution/login/fulfilled') {
        // Redirect to the institution's dashboard upon successful login
        const institutionId = response.payload.institution._id; // Replace with the actual response structure
        console.log('Redirecting to dashboard...');
        navigate(`/institution/${institutionId}/dashboard`);
      } else {
        console.error('API Error:', response.payload.message);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  
  
  return (
    <div>
      <Navbar/>
    
    <div className="w-full flex flex-col justify-center items-center mt-10">
      <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
        {isLoading ? <Spinner /> : ``}
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
    </div>
  );
}

export default Login;
 