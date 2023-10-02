// mui imports
import { Button, MenuItem, TextField } from '@mui/material'

import remitaImg from '../../../assets/remita.png'

// react imports
import React, { useState } from 'react'

import { Link } from 'react-router-dom'

function AlumniDetailsForm() {

    const [activeForm, setActiveForm] = useState(1)

    const currencies = [
        {
            value: ' ',
            label: ' ',
          },
        {
          value: 'full time',
          label: 'f',
        },
        {
          value: 'part time',
          label: 'p',
        },
        {
          value: 'remedials',
          label: 'r',
        }
      ];

  return ( 
    <div className=' p-5'>
        
    <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
    <h4 className='font-bold'>University Of Jos</h4>
    <Button
  variant='contained'
  className='md:w-4/12 mx-auto bg-gray-300'
  onClick={() => {}}
  style={{ color: 'black', marginLeft: '0' }}
>
  Request Transcript
</Button>


        <h4 className='font-bold text-center'>Fill the Form below</h4>
        <p className='text-[14px] font-light text-center'>When applying for your transcript, 
        please ensure that you carefully and accurately fill out the form below. 
        Double-check all the information you provide, including your name, student ID number, 
        course details, and the address where you want the transcript to be sent. 
        Any errors or discrepancies may lead to delays in processing your request.</p>


       {/** <ul className='p-2 border border-green-700 text-[12px] rounded-lg bg-green-50 text-green-700 gap-y-1'>
            <li>* carefully and accurately fill out theform below.</li>
            <li>* Double-check all the informations you provide, including your name, studentID number, course details, and the address where you want the transcript to be sent.</li>
            <li>* Any errors or discrepancies may lead to delays in processing your request</li>
        </ul>  */}



        <form className='flex flex-col'>
            {activeForm == 1 && 
            
                  <div className="md:w-8/12 m-auto p-5">
                  {/* Conditionally render the forms based on screen size */}
                  {window.innerWidth >= 768 ? (
                    /* Large screen form */
                    <div className="md:w-8/12 m-auto p-5 grid md:grid-cols-2 md:gap-x-[50px] gap-y-[25px]">
                      <h4 className='col-span-2 text-center font-bold'>Bio-data</h4>
                      <TextField
                        label="Full Name"
                        id="outlined-size-small"
                        size="small"
                        className="custom-textfield"
                      />
            
                      <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Program Type"
                        SelectProps={{
                          native: true,
                        }}
                        className="custom-textfield"
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
            
                      <TextField
                        label="Matric/Reg Number"
                        id="outlined-size-small2"
                        size="small"
                        className="custom-textfield"
                      />
            
                      <TextField
                        label="Type Of Degree"
                        id="outlined-size-small3"
                        size="small"
                        className="custom-textfield"
                      />
            
                      <TextField
                        label="Department"
                        id="outlined-size-small4"
                        size="small"
                        className="custom-textfield"
                      />
            
                      <TextField
                        label=""
                        id="outlined-size-small5"
                        size="small"
                        type='date'
                        helperText="Select Graduation year"
                        FormHelperTextProps={{ className: 'text-center font-bold c-red' }}
                        className="custom-textfield"
                      />


                    </div>
                  ) : (
                    /* Small screen form */
                    <div className="md:w-8/12 m-auto p-5 flex flex-col items-center">
                      <h4 className="text-center font-bold mb-4">Bio-data</h4>
                      <TextField
                        label="Full Name"
                        id="outlined-size-small"
                        size="small"
                        className="custom-textfield"
                      />
            
                      <TextField
                        id="outlined-select-currency-native"
                        select
                        label="Program Type"
                        className="mt-5"
                        style={{ width: '100%' }}
                        
                        SelectProps={{
                          native: true,
                        }}
                        
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
            
                      <TextField
                        label="Matric/Reg Number"
                        id="outlined-size-small2"
                        size="small"
                        className="custom-textfield mt-5"
                      />
            
                      <TextField
                        label="Type Of Degree"
                        id="outlined-size-small3"
                        size="small"
                        className="custom-textfield mt-5"
                      />
            
                      <TextField
                        label="Department"
                        id="outlined-size-small4"
                        size="small"
                        className="custom-textfield mt-5"
                      />
            
                      <TextField
                        label=""
                        id="outlined-size-small5"
                        size="small"
                        type="date"
                        helperText="Select Graduation year"
                        FormHelperTextProps={{ className: 'text-center font-bold c-red' }}
                        className="custom-textfield mt-5"
                      />
                    </div>
                  )}
                </div>
            
              

                
            }
            
            {activeForm == 2 && 
               <div className="md:w-8/12 m-auto p-5">
               
               {window.innerWidth >= 768 ? (
                /**Large Screens */
                 <div className="md:w-8/12 m-auto grid md:grid-cols-2 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5">
                   <h4 className="col-span-2 text-center font-bold">Delivery Method</h4>
                   <TextField label="Mode of delivery" size="small" select />
                   <TextField label="Recipient email" size="small" type="email" />
                   <TextField label="Recipient address" size="small" type="text" />
                   <TextField label="Phone Number" size="small" type="number" />
                   <TextField size="small" type="file" />
                 </div>
               ) : (
                /**Small Screens */
                 <div className="md:w-8/12 m-auto p-5 flex flex-col items-center">
                   <h4 className="text-center font-bold mb-4">Delivery Method</h4>
                   <TextField label="Mode of delivery" size="small" style={{ width: '100%' }}  select className="custom-textfield" />
                   <TextField label="Recipient email" size="small" type="email" className="custom-textfield mt-5" />
                   <TextField label="Recipient address" size="small" type="text" className="custom-textfield mt-5" />
                   <TextField label="Phone Number" size="small" type="number" className="custom-textfield mt-5" />
                   <TextField size="small" type="file" className="custom-textfield mt-5" />
                 </div>
               )}
             </div>
            
             
            }    

            {activeForm == 3 && 
                <div className='grid grid-cols md:w-8/12 m-auto md:gap-x-[50px] gap-y-[25px]'>
                    <h4 className='text-center'>Select payment method</h4>
                    <div className='flex justify-center'>
                        <img className='cursor-pointer' src={remitaImg} alt="remita" />
                    </div>
                </div>
            }    
            
            
            

        </form>

        {activeForm == 1 && 
            (<Button
                variant='contained'
                className=' md:w-4/12 mx-auto bg-purple-700'
                onClick={()=>{setActiveForm(2)}}
            >
                Continue
            </Button>)
        }

        {activeForm == 2 &&
            (
            <div className="grid grid-cols-2 ">
                <Button
                    variant='contained'
                    className=' mx-auto bg-purple-700'
                    onClick={()=>{setActiveForm(1)}}
                >
                    Previous
                </Button>

                <Button
                    variant='contained'
                    className=' mx-auto bg-purple-700'
                    onClick={()=>{setActiveForm(3)}}
                >
                    Complete
                </Button>
            </div>
            )
        } 

        {activeForm == 3 && 
            (<Link to={`/alumni/:id/requesttrackanddelivery`}> {/** Added Link To the Table Items To Open The Request Track And Delivery Page */}<Button
                variant='contained'
                className='md:w-4/12 mx-auto bg-purple-700 lowercase uppercase'
                
            >
                Proceed
            </Button>
            </Link>)
        }   
        
    </div>
    </div>
    
  )
}

export default AlumniDetailsForm