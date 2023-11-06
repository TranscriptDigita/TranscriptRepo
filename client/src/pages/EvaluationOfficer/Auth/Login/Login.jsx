import React, { useState } from 'react'
import { Button, Divider,  TextField } from '@mui/material'
import { Link } from 'react-router-dom'
import Newnavbar from '../../../../components/navbar/Newnavbar';
import StaffNavBar from '../../../../components/navbar/StaffNavBar';
import { FaGoogle } from 'react-icons/fa6';


function Login() {
   
    return (
        <div>
          <StaffNavBar/>
        <div className='w-full flex flex-col justify-center items-center'>
           
            <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
                <div className='flex flex-col gap-y-4 mt-20'>
                    <label>Email</label>
                    <TextField
                        id="outlined-text-input"
                        label=""
                        type="text"
                        name=""
                      
                    />
                    <label>Password</label>
                    <TextField
                        id="outlined-password-input"
                        label=""
                        type="password"
                        autoComplete="current-password"
                        name="password"
                    />
                </div>
                <div className='text-right text-xs font-light'>
                    <Link>Forgot Password?</Link>
                </div>
                <Button
                    variant="contained"
                    className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
                  
                >
                    Sign in
                </Button>
                {/* <Button
                    variant="contained"
                    className='bg-[#CCCCCC] text-slate-900 hover:bg-[#CCCCCC] lowercase'
                >
                    <Link to={`/institution/signup`}>Create Account</Link>
                </Button> */}

                <Divider>or continue with</Divider>

                <Button
                variant="contained"
                endIcon={<FaGoogle />}
                className="bg-[#CCCCCC] text-slate-900 lowercase hover:bg-[#CCCCCC]"
                >
                continue with google
                </Button>

                <p className="text-xs text-center">
                by clicking the sign up button you agree to our terms and policies.
                </p>
            </div>
        </div>
        </div>
    );
}

export default Login;
