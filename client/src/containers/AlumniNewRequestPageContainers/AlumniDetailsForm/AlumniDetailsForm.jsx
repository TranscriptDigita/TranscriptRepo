import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import remitaImg from '../../../assets/remita.png';
import { CountryDropdown } from '../../../components';

function AlumniDetailsForm() {


  const { data } = useParams(); 
  const decodedData = decodeURIComponent(data);






  useEffect(() => {
    // Log the full URL to the console for debugging
    console.log('Full URL:', window.location.href);
  }, []);

  //Construct the full decoded URL
  const fullDecodedURL = window.location.origin + window.location.pathname.replace(data, decodedData) + window.location.search;


 
  useEffect(() => {
    // Retrieve the selected institution index from local storage
    const selectedInstitutionIndex = localStorage.getItem('selectedInstitutionIndex');

    if (selectedInstitutionIndex !== null) {
      // Use the index to access the corresponding institution data
      const institutions = JSON.parse(localStorage.getItem('institutionData'));
      setSelectedInstitution(institutions[selectedInstitutionIndex]);
    }
  }, []);

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
  const [selectTranscriptType, setSelectTranscriptType] = useState('');

  const handleDeliveryMethodChange = (event) => {
    setSelectedDeliveryMethod(event.target.value);
  };
  
  const LocalStorageViewer = () => {
    // const userData = JSON.parse(localStorage.getItem('user'));



    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

console.log("This is the token from local storage:", token);
console.log("This is the user data from local storage:", userData);

    
    // const token = localStorage.getItem('token');
    // const userData = JSON.parse(localStorage.getItem('user'));
    
    // console.log("This is the token from local storage:", token);
    // console.log("This is the user data from local storage:", userData);
    

    return (
      <div className="local-storage-viewer">
        <h2>Local Storage Data:</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    );
  };



  const [activeForm, setActiveForm] = useState(1);

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
    },
  ];

  // Refs for capturing input values
  const facultyRef = useRef(null);
  const programTypeRef = useRef(null);
  const matricRef = useRef(null);
  const degreeRef = useRef(null);
  const departmentRef = useRef(null);
  const graduationYearRef = useRef(null);
  const deliveryMethodRef = useRef(null);
  const recipientEmailRef = useRef(null);
  const recipientAddressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const deliveryTypeRef = useRef(null);
  const transcriptTypeRef = useRef(null);
  const addressRef = useRef(null);


  //API SECTION

  const handleSubmit = async () => {
    event.preventDefault();
    // Prepare the data for the API request
    const requestData = {
      degreeType: degreeRef.current.value,
      institution: decodedData, // Assuming it's always the same
      faculty: facultyRef.current.value,
      department: departmentRef.current.value,
      matricNumber: matricRef.current.value,
      yearOfGraduation: graduationYearRef.current.value,
      program: programTypeRef.current.value,
    };
  
    // Retrieve the token from local storage
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  
    try {
      // Make the API request to create a transcript
      const response = await fetch('https://dacs.onrender.com/api/v1/transcript', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Use the retrieved token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      // Log the request data
      console.log('Request Data:', requestData);
  
      // Log the full API response
      const responseData = await response.json();
      console.log('API Response:', responseData);
  
      // Check if the API request was successful
      if (response.ok) {
        // Handle success, you may want to show a success message or navigate to another page
        console.log('Transcript created successfully');
        // Now, you can change the active form

       // Save the response data to local storage
      localStorage.setItem('transcriptApiResponse', JSON.stringify(responseData));
      setActiveForm(2);
      } else {
        // Handle error, you may want to show an error message
        console.error('Failed to create transcript');
      }
    } catch (error) {
      // Handle any network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };

  const transcriptApiResponse = JSON.parse(localStorage.getItem('transcriptApiResponse'));
  const transcriptId = transcriptApiResponse?.Transcript?._id;

  const handlePatchRequest = async (selectTranscriptType, event) => {
    event.preventDefault();
    console.log('Current transcriptId:', transcriptId);
    if (!transcriptId) {
      console.error('transcriptId is not available');
      return;
    }
  
    const requestDataa = {
      typeOfTranscript: selectTranscriptType,
      modeOfDelivery: selectedDeliveryMethod,
      recipientCountry: 'Nigeria',
      recipientAddress: recipientAddressRef.current?.value,
      recipientPhoneNumber: phoneNumberRef.current?.value,
      recipientEmail: recipientEmailRef.current?.value,
    };
  
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  
    try {
      const response = await fetch(`https://dacs.onrender.com/api/v1/transcript/${transcriptId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestDataa),
      });
  
      console.log('Request Data:', requestDataa);
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Handle success or navigate to another page
      } else {
        console.error('Failed to update transcript delivery details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  





  


  return (
    <div className='p-5'>
      <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
        <h4 className='font-bold'>{data}</h4>
        
        
        
       
        <button
          className='md:w-4/12 mx-auto bg-gray-300'
          onClick={() => {}}
          // style={{ color: 'black', marginLeft: '0' }}
        >
          Request Transcript From {data}
        </button>

        <h4 className='font-bold text-center'>Fill the Form below</h4>
        <p className='text-[14px] font-light text-center'>
          When applying for your transcript, please ensure that you carefully and accurately fill out the form below.
          Double-check all the information you provide, including your name, student ID number, course details, and the
          address where you want the transcript to be sent. Any errors or discrepancies may lead to delays in processing
          your request.
        </p>

        {/* <LocalStorageViewer/> */}

        <form className='flex flex-col'>
          {activeForm == 1 && (
            <div className='md:w-8/12 m-auto p-5'>
              {/* Conditionally render the forms based on screen size */}
              {window.innerWidth >= 768 ? (
                /* Large screen form */
                <div className='md:w-8/12 m-auto p-5 grid md:grid-cols-2 md:gap-x-[50px] gap-y-[25px]'>
                  <h4 className='col-span-2 text-center font-bold'>Bio-data</h4>
                  <input
                   type='text'
                   placeholder='Faculty'
                   ref={facultyRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Program Type'
                    ref={programTypeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Matric/Reg Number'
                    ref={matricRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Type Of Degree'
                    ref={degreeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Department'
                    ref={departmentRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    ref={graduationYearRef}
                    placeholder='Graduation year'
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </div>
              ) : (
                /* Small screen form */
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                  <h4 className='text-center font-bold mb-4'>Bio-data</h4>
                  <input
                    type='text'
                    placeholder='Faculty'
                    ref={facultyRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Program Type'
                    ref={programTypeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Matric/Reg Number'
                    ref={matricRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Type Of Degree'
                    ref={degreeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Department'
                    ref={departmentRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    ref={graduationYearRef}
                    placeholder='Select Graduation year'
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </div>
              )}
            </div>
          )}

        
{activeForm == 2 && (
            <div className='md:w-8/12 m-auto grid md:grid-cols-2 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5'>
              <h4 className='col-span-2 text-center font-bold'>Delivery Method</h4>

                            <select
                onChange={selectTranscriptType}
                
                ref={transcriptTypeRef}
                className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
              >
                <option value='' disabled>Select Type of Transcript</option>
                <option value='email'>Official</option>
                <option value='homeDelivery'>Personal</option>
              </select>

              <select
                onChange={handleDeliveryMethodChange}
                value={selectedDeliveryMethod}
                ref={deliveryTypeRef}
                className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
              >
                <option value='' disabled>Select mode of delivery</option>
                <option value='email'>Email</option>
                <option value='homeDelivery'>Home Delivery</option>
                <option value='pickUp'>Pick up</option>
                {/* Add more options as needed */}
              </select>


              

              {selectedDeliveryMethod === 'homeDelivery' && (
                <>
                  <input
                    type='email'
                    placeholder='Recipient email'
                    ref={recipientEmailRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Recipient address'
                    ref={recipientAddressRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='number'
                    placeholder='Phone Number'
                    ref={phoneNumberRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />

                 
                  <CountryDropdown />
                </>
              )}

              {selectedDeliveryMethod === 'email' && (
                <>
                  <input
                    type='email'
                    placeholder='Recipient email'
                    ref={recipientEmailRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </>
              )}

              {selectedDeliveryMethod === 'pickUp' && (
                <>
                  <input
                    type='email'
                    placeholder='Recipient email'
                    ref={recipientEmailRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='number'
                    placeholder='Phone Number'
                    ref={phoneNumberRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </>
              )}
            </div>
          )}


          {activeForm == 3 && (
            <div className='grid grid-cols md:w-8/12 m-auto md:gap-x-[50px] gap-y-[25px]'>
              <h4 className='text-center'>Select payment method</h4>
              <div className='flex justify-center'>
                <img className='cursor-pointer' src={remitaImg} alt='remita' />
              </div>
            </div>
          )}

          {/* Buttons */}
          {activeForm == 1 && (

            <div>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              // setActiveForm(2); // Navigate to the next step
              handleSubmit(); // Call handleSubmit
            }}>
              Continue
            </button>

            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
              // handleSubmit(); // Call handleSubmit
            }}>
              next
            </button>
            </div>
          )}

          {activeForm == 2 && (
            <div className='grid grid-cols-2 '>






              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(1); // Navigate to the previous step
                handleSubmit(); // Call handleSubmit
              }}>
                Previous
              </button>
              <button
                className='md:w-4/12 mx-auto bg-purple-700 border-2 rounded-md p-2'
                onClick={() => {
                  handlePatchRequest(selectTranscriptType, event);
                }}
              >
                Update Delivery Details
              </button>
            </div>
          )}

          {activeForm == 3 && (
            <Link to={`/alumni/:id/requesttrackanddelivery`}>
              {/* Added Link To the Table Items To Open The Request Track And Delivery Page */}
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2 lowercase uppercase '>
                Proceed
              </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
}

export default AlumniDetailsForm;
