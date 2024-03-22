import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Navbar } from '../../components';

function VerifyCertificate() {



  useEffect(() => {
    
    const keywordsMetaTag = document.createElement('meta');
    keywordsMetaTag.name = 'keywords';
    keywordsMetaTag.content = 'loumni, transcript, transcript processing, certificate, certificate processing, request for transcript, transcript processing system, academic records system, academy document, process academy document, request academy document, online transcript request system, centralized academy system, certificate system, transcript request';

    const descriptionMetaTag = document.createElement('meta');
    descriptionMetaTag.name = 'description';
    descriptionMetaTag.content = "Loumni is a nationwide academy document processing system. With loumni, alumni/student can request for academic document such as Certificate, transcript, statement of result from their comfort zone and it'll delivered with ease.";

    document.head.appendChild(keywordsMetaTag);
    document.head.appendChild(descriptionMetaTag);

    return () => {
      // Clean up the added meta tags when the component unmounts
      document.head.removeChild(keywordsMetaTag);
      document.head.removeChild(descriptionMetaTag);
    };
  }, []);

  
  const [institutionData, setInstitutionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState('option1'); // Default selected value
  const [studentRegNumber, setStudentRegNumber] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState({});

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

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
  
    // Construct the request body
    const requestBody = {
      registrationNumber: studentRegNumber,
      institutionId: institutionId,
    };
  
    try {
      const response = await fetch('https://dacs.onrender.com/api/v1/students-data/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle the response data as needed for successful cases
        console.log('Success: Certificate verified', data);
  
        // Open the pop-up with the verification result and selected data from API response
        openPopup({
          isValid: true,
          matricNumber: studentRegNumber,
          institution: institutionData.find((inst) => inst._id === selectedSchool)?.name,
          // Select the required data to display in the pop-up message
          studentName: data.data.studentName,
          grade: data.data.grade,
          cgp: data.data.cgp,
          yearOfGraduation: data.data.yearOfGraduation

        });
        
      } else {
        throw new Error('Failed to verify certificate');
      }
    } catch (error) {
      // Log the error message and open the pop-up with the verification failure
      console.error('Error verifying certificate:', error);
      openPopup({
        isValid: false,
        matricNumber: studentRegNumber,
        institution: institutionData.find((inst) => inst._id === selectedSchool)?.name,
      });
    }
  };

  return (
    <div>
    <Navbar/>
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
        <div className='flex flex-col gap-y-4'>
        <p style={{ fontWeight: 'bold', color: '#6B3FA0', fontSize: '2rem' }}>Verify Certificate </p>
          <select
            className='custom-dropdown border-2 border-black border-solid rounded-md p-2 flex-1'
            value={selectedSchool}
            onChange={handleSchoolChange}
          >
            <option value='option1'>Select Institution</option>
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

      {/* Pop-up window for displaying the verification result */}
      {isPopupOpen && (
  <div className='popup mt-20 bg-gray-300' style={{ borderRadius: "20px", padding: "20px" }}>
    {popupContent.isValid ? (
      <div>
        <p style={{ fontSize: "1.2rem", marginBottom: "1rem", fontWeight: "bold" }}>
          Certificate Verification Result
        </p>
        <p style={{ fontSize: "1rem" }}>
          The certificate bearing registration number <span style={{ fontWeight: "bold" }}>{popupContent.matricNumber}</span> from <span style={{ fontWeight: "bold" }}>{popupContent.institution}</span> has been verified as authentic.
        </p>
        <p style={{ fontSize: "1rem", marginTop: "0.5rem" }}>
          Student Name: <span style={{ fontWeight: "bold" }}>{popupContent.studentName}</span> | Grade: <span style={{ fontWeight: "bold" }}>{popupContent.grade}</span> | CGP: <span style={{ fontWeight: "bold" }}>{popupContent.cgp}</span>
        </p>
      </div>
    ) : (
      <p style={{ fontSize: "1rem" }}>
        The certificate with matric no: <span style={{ fontWeight: "bold" }}>{popupContent.matricNumber}</span> from <span style={{ fontWeight: "bold" }}>{popupContent.institution}</span> could not be verified.
      </p>
    )}
    <Button onClick={closePopup} className='bg-gray-200'>Close</Button>
  </div>
)}

    </div>
    </div>
  );
}

export default VerifyCertificate;
