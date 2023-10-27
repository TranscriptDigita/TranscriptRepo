import React, { useState } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerInstitution } from '../../../../features/auth/institutionSlice'; // Import the registerInstitution action
import { Spinner } from '../../../../components';
import { useNavigate } from "react-router-dom";
// import institutionService from '../../../../features/auth/institutionService';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        emailAddress: '',
        location: '',
        password: '',
        confirmedPassword: '',
    });

    const navigate = useNavigate();
   

    const inputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dispatch = useDispatch(); // Initialize the dispatch function
    const {user, isLoading, isSuccess, isError, message } = useSelector((state) => state.institution);

    console.log('isSuccess:', isSuccess);
    console.log('isError:', isError);
    console.log('message:', message);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(formData); // Log all form data

    //     const { name, emailAddress, location, password } = formData;
    //     const institutionData = {
    //         name,
    //         emailAddress,
    //         location,
    //         password,
    //     };

    //     try {
    //         const response = await dispatch(registerInstitution(institutionData)); // Dispatch the registerInstitution action

    //         // Handle success or error logic based on the state
    //         if (isSuccess) {
    //             console.log(institutionData);
    //             navigate(`/institution/${user.institution._id}/verify`).then(() => {
    //                 console.log(`Page open: /institution/${user.institution._id}/verify`);
    //               });
                  
            
    //             console.log(formData); 
    //             console.log('Registration successful');
    //         } else if (isError) {
    //             // Handle API errors
    //             console.error('API Error:', message);
    //         }
    //     } catch (error) {
    //         // Handle network errors
    //         console.error('API Error:', error);
    //     }
    // };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     const { name, emailAddress, location, password } = formData;
    //     const institutionData = {
    //         name,
    //         emailAddress,
    //         location,
    //         password,
    //     };
    
    //     try {
    //         const response = await dispatch(registerInstitution(institutionData));
    //         console.log('Registration Response:', response);
    
    //         if (isSuccess) {
    //             console.log('Registration successful', institutionData);
    //             console.log('User:', user);
    //             navigate(`/institution/${user.institution._id}/verify`).then(() => {
    //                 console.log('Page open:', `/institution/${user.institution._id}/verify`);
    //             });
    //         } else if (isError) {
    //             console.error('API Error:', message);
    //         }
    //     } catch (error) {
    //         console.error('API Error:', error);
    //     }
    // };




    // Signup.js
const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, emailAddress, location, password } = formData;
    const institutionData = {
      name,
      emailAddress,
      location,
      password,
    };
  
    try {
      const response = await dispatch(registerInstitution(institutionData));
      if (isSuccess) {
        console.log('Registration successful', institutionData);
        console.log('User:', user);
  
        // Navigate to verification page with institution ID
        navigate(`/institution/${response.institution._id}/verify`).then(() => {
          console.log(`Page open: /institution/${response.institution._id}/verify`);
        });
      } else if (isError) {
        console.error('API Error:', message);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };
  
    
    

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
                {isLoading ? <Spinner/> : ``}
                <div className='grid grid-cols-2 gap-y-4 gap-x-4'>
                    <TextField
                        id='outlined-text-input'
                        label='university name'
                        type='text'
                        name='name'
                        className='col-span-2'
                        value={formData.name}
                        onChange={inputChange}
                    />
                    <TextField
                        id='outlined-email-input'
                        label='email address'
                        type='email'
                        name='emailAddress'
                        value={formData.emailAddress}
                        onChange={inputChange}
                    />
                    <TextField
                        id='outlined-text-input'
                        label='state'
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={inputChange}
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
                        label='confirm Password'
                        type='password'
                        autoComplete='current-password'
                        name='confirmedPassword'
                        value={formData.confirmedPassword}
                        onChange={inputChange}
                    />
                </div>
                <Button
                    variant='contained'
                    className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
                    onClick={handleSubmit}
                >
                    Sign up
                </Button>
                <div className='text-right text-xs font-light'>
                    <Link to={`/institution/login`}>Already have an account? Login</Link>
                </div>
                <Divider>or continue with</Divider>
                <Button
                    variant='contained'
                    className='bg-[#CCCCCC] text-slate-900 lowercase hover:bg-[#CCCCCC]'
                >
                    continue with google
                </Button>
                <p className='text-xs text-center'>By clicking the sign-up button, you agree to our terms and policies.</p>
            </div>
        </div>
    );
}

export default Signup;