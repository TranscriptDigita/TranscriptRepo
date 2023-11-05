import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

function Login() {
    const [formData, setFormData] = useState({
        adminuserName: '',
        password: '',
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
        const apiUrl = 'https://transcriptdigita-api.onrender.com/api/v1/institution/login';
        const { adminuserName, password } = formData;
        const requestData = {
            adminuserName,
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
                <div className='flex flex-col gap-y-4'>
                    <TextField
                        id="outlined-text-input"
                        label="Admin username"
                        type="text"
                        name="adminuserName"
                        value={formData.universityName}
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
                <div className='text-right text-xs font-light'>
                    <Link>Forgot Password?</Link>
                </div>
                <Button
                    variant="contained"
                    className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
                    onClick={handleSubmit}
                >
                    Sign in
                </Button>
            </div>
        </div>
    );
}

export default Login;
