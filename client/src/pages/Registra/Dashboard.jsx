import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import remitaImg from '../../assets/remita.png';
import StaffListTable from '../../components/table/StaffListTable';
import { RecentRequests, StaffList } from '../../containers';

function Dashboard() {
  const [activeForm, setActiveForm] = useState(1);


  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // Initialize with an empty string or a default role
  const [password, setPassword] = useState('');

  const apiEndpoint = 'https://dacs.onrender.com/api/v1/staff';

  const handleCreateStaff = async () => {
    const data = {
      emailAddress: email,
      role: role,
    };
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourBearerToken}`, // Replace with your actual Bearer token
        },
        body: JSON.stringify(data),
      });
  
      if (response.status === 201) {
        // Successful staff creation
        // Log the data when the API call is successful
        console.log('Data sent to server:', data);
        console.log('Staff created successfully');
        // You can handle the success scenario here, e.g., show a success message
      } else {
        // Handle errors, e.g., show an error message
        console.error('Error creating staff:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating staff:', error);
    }
    
    // Set the active form to 3 regardless of the API call status
    setActiveForm(3);
  };
  

  
  
 

  
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
    


        <form className='flex flex-col'>
          {activeForm == 1 && (
            <div className='flex flex-col gap-y-4'>
              <h4 className='font-semibold'>Staff List</h4>
            <p className='font-light text-[14px]'>To the <span className='font-semibold'>Registrar,</span></p>
            <p className='font-light text-[14px]'>Please create dedicated staff roles to handle the transcript process efficiently. Assign responsibilities to these staff members as follows:</p>

            <p className='font-light text-[14px]'>1. Transcript Evaluation officer: Responsible for overseeing the entire transcript process, coordinating with relevant departments, and ensuring timely delivery of transcripts.</p>
            <p className='font-light text-[14px]'>2. Exams and records: Tasked with accurately entering student information into the system, including transcript requests and delivery details.</p>
            <p className='font-light text-[14px]'>3. Transcript Processor: Responsible for processing transcript requests, verifying academic records, and preparing official transcripts for issuance.</p>
            <p className='font-light text-[14px]'>4. Communication Liaison: Handles communication with students, faculty, and other departments regarding transcript-related inquiries and updates.</p>

            </div>
          )}

          {activeForm == 2 && (
            <div className='p-5'>
            {window.innerWidth >= 768 ? (
             <div className='flex flex-col gap-y-4'>
             <h4 className='col-span-2 font-bold'>Create Staff List</h4>
             <span className='font-semibold'>Email: </span>
             <input
               type='text'
               placeholder=''
               value={email}
               onChange={e => setEmail(e.target.value)}
               className='custom-textfield border-2 border-black border-solid rounded-md p-2'
             />
             <span className='font-semibold'>Role: </span>
             <select
               value={role}
               onChange={e => setRole(e.target.value)}
               className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
             >
               <option value='option1'>Option 1</option>
               <option value='option2'>Option 2</option>
               <option value='option3'>Option 3</option>
             </select>
             {/* <span className='font-semibold'>Password: </span> */}
             <div className='flex'>
               {/* <input
                 type='text'
                 placeholder=''
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
               /> */}
               <button
                 className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                 onClick={handleCreateStaff}
               >
                 Create
               </button>
             </div>
          
       
                <h4 className='col-span-2 font-bold'>Staff List</h4>
               <StaffList/>
              </div>
              ) : (
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                 </div>
              )}
            </div>
          )}
            {activeForm == 3 && (
            <div className='p-5'>
            {window.innerWidth >= 768 ? (
              <div className='flex flex-col gap-y-4'>
                <h4 className='col-span-2 font-bold'>Account</h4>
                <p className='font-light text-[14px]'>Please set price for documents obtainable from your institution</p>
                <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2 p-2'>
                <label htmlFor='institutionAccountNumber' className='block font-semibold'>
                Institutions Account Number:
                </label>
                <input
                type='text'
                id='institutionAccountNumber'
                placeholder=''
            
                className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                />

              

            </div>



            <div className='md:w-1/2 p-2'>
                <label htmlFor='institutionAccountNumber' className='block font-semibold'>
                Sort Code:
                </label>
                <input
                type='text'
                id='institutionAccountNumber'
                placeholder=''
            
                className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                />

              

            </div>


            <div className='md:w-1/2 p-2'>
                <label htmlFor='bankName' className='block font-semibold'>
                Bank Name:
                </label>
                <input
                type='text'
                id='bankName'
                placeholder=''
            
                className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                />

            <button
                    className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                    onClick={() => {
                      // Your onClick logic here
                      setActiveForm(3);
                    }}
                  >
                    Save
                  </button>


                </div>
                </div>

                                <span className='font-semibold'>Type of Document: </span>
                <select
                 
                    className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
                  >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    {/* Add more options as needed */}
                  </select>
                  <span className='font-semibold'>Amount: </span>
                <div className='flex'>
                <select
                   
                    className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
                  >
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                    {/* Add more options as needed */}
                  </select>
                  <button
                    className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                    onClick={() => {
                      // Your onClick logic here
                      setActiveForm(3);
                    }}
                  >
                    Create
                  </button>
                </div>
                <h4 className='col-span-2 font-bold'>Staff List</h4>
                <StaffList/>
              </div>
              ) : (
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                   </div>
              )}
            </div>
          )}





          {/* Buttons */}
          {activeForm == 1 && (
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
             
            }}>
              Create Staff List
            </button>
          )}

         

          {activeForm == 3 && (
            <Link to={`/alumni/:id/requesttrackanddelivery`}>
              {/* Added Link To the Table Items To Open The Request Track And Delivery Page */}
              {/* <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2 lowercase uppercase '> */}
                {/* Proceed */}
              {/* </button> */}
            </Link>
          )}
        </form>
      </div>
    
  );
}

export default Dashboard;
