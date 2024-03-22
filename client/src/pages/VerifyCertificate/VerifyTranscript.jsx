import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Navbar } from '../../components';

function VerifyTranscript() {
  const [transcriptId, setTranscriptId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);
  const [popupContent, setPopupContent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleVerification = async () => {
    try {
      const url = `https://dacs.onrender.com/api/v1/transcript/${transcriptId}/verify`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to verify transcript');
      }
  
      const data = await response.json();
      setVerificationResult(data);
      setError(null);
    } catch (error) {
      console.error('Error verifying transcript:', error);
      if (error.message === 'Failed to verify transcript') {
        setError('Transcript Reference Id is not valid. Please contact your institution or apply for a new transcript through Loumni.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setVerificationResult(null);
    }
  };
  

  const openPopup = (content) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  let displaySentence = '';
  if (verificationResult && verificationResult.length > 0) {
    const { institutionName, degreeType, yearOfGraduation } = verificationResult[0];
    displaySentence = `The student Transcript From ${institutionName} with a ${degreeType} degree, graduated in the year ${new Date(yearOfGraduation).getFullYear()}. Is Valid`;
  }

  return (
    <div>
    <Navbar/>
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0'>
        <div className='flex flex-col gap-y-4'>
          <p style={{ fontWeight: 'bold', color: '#6B3FA0', fontSize: '2rem' }}>Verify Transcript </p>
          <TextField
            id='outlined-email-input'
            label=''
            type='text'
            placeholder='Enter Student Transcript Reference Id'
            value={transcriptId}
            onChange={(e) => setTranscriptId(e.target.value)}
          />
        </div>
        <Button
          variant='contained'
          className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
          onClick={handleVerification}
        >
          Verify
        </Button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
  
      {verificationResult && verificationResult.length === 0 && (
        <p style={{ color: 'red' }}>No transcript found for the provided ID. Please Contact Your Institution Or Start a New Transcript Application Through Loumni</p>
      )}
  
      {verificationResult && verificationResult.length > 0 && (
        <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '5px', background: '#f9f9f9' }}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>Transcript Verification FeedBack</p>
          <p style={{ fontSize: '1rem', textAlign: 'center', margin: '0' }}>{displaySentence}</p>
        </div>
      )}
    </div>
    </div>
  );
  }

export default VerifyTranscript;
