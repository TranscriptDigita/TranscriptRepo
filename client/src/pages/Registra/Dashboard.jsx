import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import remitaImg from '../../assets/remita.png';
import StaffListTable from '../../components/table/StaffListTable';
import { RecentRequests, StaffList } from '../../containers';

function Dashboard() {
  const [activeForm, setActiveForm] = useState(1);


  const [emailAddress, setEmailAddress] = useState('');
  const [role, setRole] = useState(''); // Initialize with an empty string or a default role
  const [password, setPassword] = useState('');
  const [institutionAccountNumber, setInstitutionAccountNumber] = useState('');
  const [bankSortCode, setBankSortCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');


  const apiEndpoint = 'https://dacs.onrender.com/api/v1/staff';
  const apiEndpointAccount = 'https://dacs.onrender.com/api/v1/institution/account';


  const getBearerToken = () => {
    const storedUserData = localStorage.getItem('institutionUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      const token = userDataObject?.token || '';
      console.log('Bearer Token:', token); // Log the token
      return token;
    }
    console.log('Bearer Token not found');
    return '';
  };
  

  const bearerToken = getBearerToken();
  console.log(bearerToken);



  // const isTokenExpired = (tokenExpirationDate) => {
  //   return new Date(tokenExpirationDate) < new Date();
  // };
  
  // const storedUserData = localStorage.getItem('institutionUser');
  
  // if (storedUserData) {
  //   const userDataObject = JSON.parse(storedUserData);
  //   const token = userDataObject?.token || '';
  
  //   if (isTokenExpired(userDataObject?.expirationDate)) {
  //     console.log('Token expired');
  //     // You may want to refresh or request a new token here
  //   } else {
  //     console.log('Token still active');
  //     // The token is still valid, proceed with your API requests
  //   }
  
  //   return ;
  // }
  
 

  const handleCreateStaff = async (e) => {
    e.preventDefault();
  
    const data = {
      emailAddress,
      role,
      password
    };
  
    console.log('Data to be sent to the API:', data);
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        // Handle successful response
        console.log('Staff created successfully');
        toast.success('Staff successfully added');
      } else {
        // Handle unsuccessful response
        console.error('Error:', response.status, response.statusText);
        toast.error('Error creating staff');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };




  const handleSetBankAccount = async (e) => {
    e.preventDefault();
    console.log("account token",bearerToken);
    const data = {
      bankName,
      bankSortCode,
      accountName,
      accountNumber,
    };

    try {
      const response = await fetch(apiEndpointAccount, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Bank account set up successfully');
        toast.success('Bank account set up successfully');
      } else {
        console.error('Error:', response.status, response.statusText);
        toast.error('Error setting up bank account');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            
             <div className='flex flex-col gap-y-4'>
             <h4 className='col-span-2 font-bold'>Create Staff</h4>
             <span className='font-semibold'>Email: </span>
             <input
               type='text'
               placeholder=''
               value={emailAddress}
               onChange={e => setEmailAddress(e.target.value)}
               className='custom-textfield border-2 border-black border-solid rounded-md p-2'
             />
              <span className='font-semibold'>Password: </span>
              <input
                 type='text'
                 placeholder=''
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
               />
           
           
           
           
          
             
             <span className='font-semibold'>Role: </span> 
             
             <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="custom-dropdown border-2 border-black border-solid rounded-md p-2"
        >
          <option value="">Select Role</option>
          <option value="Credentials Evaluation Officer">Credentials Evaluation Officer</option>
          <option value="Exams And Records">Exams and Records Officer</option>
          <option value="Bursary">Bursary</option>

        </select>

               <div className='flex'>
               <button
                 className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                 onClick={handleCreateStaff}
               >
                 Create
               </button>

               <button
                 className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                 onClick={() => {
                  setActiveForm(3); // Navigate to the next step
                 
                }}
               >
                 Skip To Banking And Documents
               </button>

               
               <button
                 className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                 onClick={() => {
                  setActiveForm(1); // Navigate to the next step
                 
                }}
               >
                 Go Back
               </button>
             </div>
          
       
                <h4 className='col-span-2 font-bold'>Staff List</h4>
               <StaffList/>
              </div>
              
            </div>
          )}
            {activeForm == 3 && (
            <div className='p-5'>
            
              <div className='flex flex-col gap-y-4'>
                <h4 className='col-span-2 font-bold'>Account</h4>
                <p className='font-light text-[14px]'>Please set price for documents obtainable from your institution</p>
                <div className='flex flex-col md:flex-row'>


                <div className='md:w-1/2 p-2'>

                <label htmlFor='institutionAccountName' className='block font-semibold'>
                Institutions Account Name:
                </label>
                <input
                type='text'
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder=''
                
                className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                />
                </div>

                
                  
                <div className='md:w-1/2 p-2'>
                
                
                
                
                <label htmlFor='institutionAccountNumber' className='block font-semibold'>
                Institutions Account No:
                </label>
                <input
                type='text'
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
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
                value={bankSortCode}
                onChange={(e) => setBankSortCode(e.target.value)}   
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
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder=''
            
                className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                />

            {/* <button
                    className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                    onClick={handleSetBankAccount}
                  >
                    Save
                  </button> */}


                </div>
                </div>

                
                 
                <div className='flex'>
               
                  <button
                    className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                    onClick={() => {
                      // Your onClick logic here
                      onClick={handleSetBankAccount}
                    }}
                  >
                    Create
                  </button>


                  <button
                 className='md:w-4/12 bg-purple-700 border-2 rounded-md p-2'
                 onClick={() => {
                  setActiveForm(1); // Navigate to the next step
                 
                }}
               >
                 Go Back
               </button>
                </div>
                <h4 className='col-span-2 font-bold'>Staff List</h4>
                <StaffList/>
              </div>
             
            </div>
          )}





          {/* Buttons */}
          {activeForm == 1 && (
            <div>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
             
            }}>
              Add New Staff
            </button>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(3); // Navigate to the next step
             
            }}>
              Banking And Document Pricing
            </button>
            </div>
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
