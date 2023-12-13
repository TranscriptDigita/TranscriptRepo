import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

function VerifyCertificate() {
  const [institutionData, setInstitutionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('option1'); // Default selected value
  const [studentRegNumber, setStudentRegNumber] = useState('');

  useEffect(() => {
    // Fetch institution data from the API
    fetch('https://dacs.onrender.com/api/v1/institution', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch institution data');
        }
      })
      .then((data) => {
        setInstitutionData(data);
        setIsLoading(false);
        console.log('Success: Data fetched from the API', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []); // The empty dependency array ensures the effect runs once on component mount

  const handleSchoolChange = (event) => {
    setSelectedSchool(event.target.value);
  };

  const handleRegNumberChange = (event) => {
    setStudentRegNumber(event.target.value);
  };

  const handleSubmit = async () => {
    // Check if the selected school and student registration number are valid
    if (selectedSchool === 'option1' || !studentRegNumber) {
      // Handle invalid input
      console.log('Please select a school and enter a student registration number');
      return;
    }
  
    // Use the selectedSchool directly as the institutionId
    const institutionId = selectedSchool;
  
    // Log the institutionId and studentRegNumber before making the API call
    console.log('Institution ID:', institutionId);
    console.log('Student Registration Number:', studentRegNumber);
  
    // Construct the request body
    const requestBody = {
      registrationNumber: studentRegNumber,
      institutionId: institutionId,
    };
  
    // Log the data sent to the API
    console.log('Data Sent to API:', requestBody);


      // Log the headers before making the API call
  console.log('Request Headers:', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  
    try {
      const response = await fetch('https://dacs.onrender.com/api/v1/students-data/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      // Log the entire API response, whether success or error
      console.log('API Response:', response);
  
      if (response.ok) {
        const data = await response.json();
        // Handle the response data as needed for successful cases
        console.log('Success: Certificate verified', data);
      } else {
        throw new Error('Failed to verify certificate');
      }
    } catch (error) {
      // Log the error message and the entire API response in case of an error
      if (error && error.message) {
        console.error('Error verifying certificate:', error.message);
      } else {
        console.error('Error verifying certificate:', error);
      }
    }
  };
  
  
  
  
  
  
  
  
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
        <div className='flex flex-col gap-y-4'>
          <p>Verify Certificate</p>
          <select
            className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
            value={selectedSchool}
            onChange={handleSchoolChange}
          >
            <option value='option1'>Select Your School</option>
            {institutionData.map((institution) => (
              <option key={institution._id} value={institution._id}>
                {institution.name}
              </option>
            ))}
          </select>

          <TextField
            id='outlined-email-input'
            label=''
            type='text'
            name=''
            placeholder='Enter Student Reg Number'
            value={studentRegNumber}
            onChange={handleRegNumberChange}
          />
        </div>
        <Button
          variant='contained'
          className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
          onClick={handleSubmit}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

export default VerifyCertificate;
