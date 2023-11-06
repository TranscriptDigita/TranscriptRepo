import React, { useState } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        emailAddress: '',
        location: '',
        password: '',
        confirmedPassword: '',
    });

    const inputChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData); // Log all form data

        // Construct the API URL and request body
        const apiUrl = 'https://transcriptdigita-api.onrender.com/api/v1/institution';
        const { name, emailAddress, location, password } = formData;
        const requestData = {
            name,
            emailAddress,
            location,
            password,
        };

        try {
            // Send a POST request to the API
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('API Response:', responseData); // Log the API response data if successful
                // Add your logic here for handling the successful response
            } else {
                console.error('API Error:', response.statusText);
                // Add your logic here for handling API errors
            }
        } catch (error) {
            console.error('API Error:', error);
            // Add your logic here for handling network errors
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
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
