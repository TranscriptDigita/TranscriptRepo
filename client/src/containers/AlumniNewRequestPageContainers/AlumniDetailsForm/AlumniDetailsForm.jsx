import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import remitaImg from '../../../assets/remita.png';

function AlumniDetailsForm() {
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


  //API SECTION

  const handleSubmit = async () => {
    // Prepare the data for the API request
    const requestData = {
      degreeType: degreeRef.current.value,
      institution: 'University of Abuja', // Assuming it's always the same
      faculty: facultyRef.current.value,
      department: departmentRef.current.value,
      matricNumber: matricRef.current.value,
      yearOfGraduation: graduationYearRef.current.value,
      program: programTypeRef.current.value,
    };
  
    try {
      // Make the API request to create a transcript
      const response = await fetch('https://transcriptdigita-api.onrender.com/api/v1/transcript', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_AUTH_TOKEN', // Replace with your actual authorization token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      // Log the request data and response
      console.log('Request Data:', requestData);
      console.log('API Response:', response);
  
      // Check if the API request was successful
      if (response.ok) {
        // Handle success, you may want to show a success message or navigate to another page
        console.log('Transcript created successfully');
      } else {
        // Handle error, you may want to show an error message
        console.error('Failed to create transcript');
      }
    } catch (error) {
      // Handle any network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };
  
  
  // const handleSubmit = () => {
  //   // Log the values of the input fields
  //   console.log('Faculty:', FacultyRef.current.value);
  //   console.log('Program Type:', programTypeRef.current.value);
  //   console.log('Matric/Reg Number:', matricRef.current.value);
  //   console.log('Type Of Degree:', degreeRef.current.value);
  //   console.log('Department:', departmentRef.current.value);
  //   console.log('Graduation Year:', graduationYearRef.current.value);
  //   console.log('Delivery Method:', deliveryMethodRef.current.value);
  //   console.log('Recipient Email:', recipientEmailRef.current.value);
  //   console.log('Recipient Address:', recipientAddressRef.current.value);
  //   console.log('Phone Number:', phoneNumberRef.current.value);
  // };

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
        <h4 className='font-bold'>University Of Jos</h4>
        <button
          className='md:w-4/12 mx-auto bg-gray-300'
          onClick={() => {}}
          style={{ color: 'black', marginLeft: '0' }}
        >
          Request Transcript
        </button>

        <h4 className='font-bold text-center'>Fill the Form below</h4>
        <p className='text-[14px] font-light text-center'>
          When applying for your transcript, please ensure that you carefully and accurately fill out the form below.
          Double-check all the information you provide, including your name, student ID number, course details, and the
          address where you want the transcript to be sent. Any errors or discrepancies may lead to delays in processing
          your request.
        </p>

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
                    type='date'
                    ref={graduationYearRef}
                    placeholder='Select Graduation year'
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </div>
              )}
            </div>
          )}

          {activeForm == 2 && (
            <div className='md:w-8/12 m-auto p-5'>
              {window.innerWidth >= 768 ? (
                <div className='md:w-8/12 m-auto grid md:grid-cols-2 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5'>
                  <h4 className='col-span-2 text-center font-bold'>Delivery Method</h4>
                  <input type='text' placeholder='Mode of delivery' ref={deliveryMethodRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2' />
                  <input type='email' placeholder='Recipient email' ref={recipientEmailRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2' />
                  <input type='text' placeholder='Recipient address' ref={recipientAddressRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2' />
                  <input type='number' placeholder='Phone Number' ref={phoneNumberRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2' />
                  <input type='file' className='custom-textfield border-2 border-black border-solid rounded-md p-2' />
                </div>
              ) : (
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                  <h4 className='text-center font-bold mb-4'>Delivery Method</h4>
                  <input type='text' placeholder='Mode of delivery' ref={deliveryMethodRef} style={{ width: '100%' }} className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-5' />
                  <input type='email' placeholder='Recipient email' ref={recipientEmailRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-5' />
                  <input type='text' placeholder='Recipient address' ref={recipientAddressRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-5' />
                  <input type='number' placeholder='Phone Number' ref={phoneNumberRef} className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-5' />
                  <input type='file' className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-5' />
                </div>
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
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
              handleSubmit(); // Call handleSubmit
            }}>
              Continue
            </button>
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
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(3); // Navigate to the next step
                handleSubmit(); // Call handleSubmit
              }}>
                Complete
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
