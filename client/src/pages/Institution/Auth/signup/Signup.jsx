import React, { useState, useRef, useEffect } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerInstitution, verifyInstitutionEmail } from '../../../../features/auth/institutionSlice';
import { Navbar, Spinner } from '../../../../components';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'


function Signup() {



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


  const [activeForm, setActiveForm] = useState(1);
  const [verificationCode, setVerificationCode] = useState(""); // Single input field for verification code
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [verifyResponse, setVerifyResponse] = useState(null);
  

  const institution = useSelector((state) => state.institution);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmitVerification = async () => {
    if (verificationCode.length === 5) {
      try {
        const verificationData = {
          id: apiResponse.institution._id,
          verificationCode,
        };
  
        const verifyResponse = await dispatch(verifyInstitutionEmail(verificationData));
  
        console.log('Verify Response:', verifyResponse);
  
        if (verifyResponse.message === 'successfully updated') {
          // Update the state after successful verification
          setVerifyResponse(verifyResponse.payload);
          // Navigation based on successful verification
          navigate(`/institution/login`);
        } else {
          // setErrorMessage('Email verification failed');
          navigate(`/institution/login`);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    } else {
      setErrorMessage('Verification code should contain 5 digits');
    }
  };
  

  // const handleResendVerificationCode = () => {
  //   // Implement the logic to resend the verification code to the user's email here
  // };

  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    location: '',
    password: '',
    confirmedPassword: '',
    phoneNumber: '',
  });

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, emailAddress, location, password, phoneNumber } = formData;
    const institutionData = {
      name,
      emailAddress,
      location,
      password,
      phoneNumber,
    };

    console.log("data", institutionData)

    try {
      const response = await dispatch(registerInstitution(institutionData));

      if (registerInstitution.fulfilled.match(response)) {
        setApiResponse(response.payload);
        setActiveForm(2);
      } else if (registerInstitution.rejected.match(response)) {
        toast.error(message);
        console.error('API Error:', response.error.message);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };


  const inputChangePhone = (event) => {
    let value = event.target.value;
    // Check if the value starts with '+' and if it does, remove it before setting the state
    if (value.startsWith('+')) {
      value = value.substring(1);
    }
    // Update the state with the value including the '+' sign
    setFormData({
      ...formData,
      phoneNumber: '+' + value,
    });
  };

  return (
    <div>
      <Navbar/>
   
    <div className='flex flex-col gap-y-4 bg-white p-5 my-auto justify-center align-center mt-10'>
    <p style={{ fontWeight: 'bold', color: '#6B3FA0', fontSize: '2rem' }}>Create Account </p>
      <form className='flex flex-col'>
        {activeForm === 1 && (
          <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0' style={{ alignSelf: "center" }}>
            <div className='grid grid-cols-2 gap-y-4 gap-x-4 '>
              <TextField
                id='outlined-text-input'
                label='Institution Name'
                type='text'
                name='name'
                className='col-span-2'
                value={formData.name}
                onChange={inputChange}
              />
              <TextField
                id='outlined-email-input'
                label='Email Address (example@email.com)'
                type='email'
                name='emailAddress'
                value={formData.emailAddress}
                onChange={inputChange}
              />
              <TextField
                id='outlined-text-input'
                label='State'
                type='text'
                name='location'
                value={formData.location}
                onChange={inputChange}
              />
                <TextField
                  id='outlined-text-input'
                  label='Phone Number (Include Country Code)'
                  type='text'
                  name='phoneNumber'
                  value={formData.phoneNumber.startsWith('+') ? formData.phoneNumber : '+' + formData.phoneNumber} // Ensure '+' is always present in the displayed value
                  onChange={inputChangePhone}
                />
              
              <TextField
                id='outlined-password-input'
                label='Password' 
                type='password'
                autoComplete='current-password'
                name='password'
                value={formData.password}
                onChange={inputChange}
              />
              <TextField
                id='outlined-password-input'
                label='Confirm Password'
                type='password'
                autoComplete='current-password'
                name='confirmedPassword'
                value={formData.confirmedPassword}
                onChange={inputChange}
              />
            </div>
            <Button
              variant='contained'
              className='bg-[#6B3FA0] hover:bg-[#6B3FA0]'
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <div className='text-right text-xs font-light'>
              <Link to={`/institution/login`}>Already have an account? Login</Link>
            </div>
            {/* <Divider>or continue with</Divider> */}
            {/* <Button
              variant='contained'
              className='bg-[#CCCCCC] text-slate-900 lowercase hover-bg-[#CCCCCC]'
            >
              continue with google
            </Button> */}
            <p className='text-xs text-center'>By clicking the sign-up button, you agree to our terms and policies.</p>
          </div>
        )}

        {activeForm === 2 && (
          <div className='flex flex-col md:w-1/2 m-auto flex-1 items-center gap-y-[50px] p-5'>
            <h4 className='font-bold'>Enter Verification Token</h4>
            <input
              type="text"
              maxLength="5"
              className='border border-slate-300 text-center py-2'
              ref={inputRef}
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            <Button
              variant='contained'
              className='bg-[#6B3FA0] hover-bg-[#6B3FA0] lowercase'
              onClick={handleSubmitVerification}
            >
              Submit
            </Button>
            {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
            <p className='text-center'>Please insert the 5-digit token sent to your email</p>
            <p className='text-[#6B3FA0] text-center'>{apiResponse.institution.emailAddress}</p>
            {/* <p className='text-[#6B3FA0] text-center'>{apiResponse.institution.emailAddress}</p> */}
            {/* <p className='text-center'>Verification Code: {apiResponse.institution.verificationCode}</p> */}
            {/* {console.log(apiResponse)} */}
            {/* <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            <pre>{JSON.stringify(verifyResponse, null, 2)}</pre> */}
          </div>
        )}
      </form>
    </div>
    </div>
  );
}

export default Signup;