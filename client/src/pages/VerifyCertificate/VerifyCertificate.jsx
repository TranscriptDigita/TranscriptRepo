import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
//import { Button, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom'

function VerifyCertificate() {
   

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
                <div className='flex flex-col gap-y-4'>
                <p>Verify Certificate</p>
                    <select className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'>
                    <option value='option1'>Select Your School</option>
                    <option value='option2'>Option 1</option>
                    <option value='option3'>Option 2</option>
                    {/* Add more options as needed */}
                  </select>

                    <TextField
                        id="outlined-email-input"
                        label=""
                        type="text"
                        name=""
                        placeholder='Enter Student Reg Number'
                       // value={formData.emailAddress}
                       // onChange={inputChange}
                    />
                   
                </div>
                {/* <div className='text-right text-xs font-light'>
                    <Link>Forgot Password?</Link>
                </div> */}
                <Button
                    variant="contained"
                    className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
                  //  onClick={handleSubmit}
                >
                    Verify
                </Button>
                
            </div>
        </div>
    );
}

export default VerifyCertificate;
