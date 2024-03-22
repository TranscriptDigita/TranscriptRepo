import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../../components';

function VerifyLogin() {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    console.log('handleInputChange called');
    setVerificationCode(event.target.value);
  };

  const handleVerification = async () => {
    console.log('Starting verification process...');
    setIsLoading(true);
  
    try {
      console.log('Sending verification request...');
      console.log('Verification code:', verificationCode);
      console.log('ID:', id);
      
      // Make API call to verify authentication
      const response = await fetch('https://dacs.onrender.com/api/v1/staff/verify-authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode, id }), // Adjust the ID source accordingly
      });

      console.log('Verification request sent.');
  
      const result = await response.json();
      console.log('Verification result:', result);

      localStorage.setItem('stafftoken', result.token);
      localStorage.setItem('staff', JSON.stringify(result.staff));
      console.log('Verification successful');

       // Extract role and staff/institution ID from the response
       const { role, _id: staffId, institution: institutionId } = result.staff;
 
        // Navigate based on the role
       // Navigate based on the role
       if (role === 'Credentials Evaluation Officer') {
        navigate(`/evaluationofficer/${staffId}/dashboard`);
      } else if (role === 'Exams And Records') {
        navigate(`/auditor/${institutionId}/${staffToken}/auditordashboard`);
      } else if (role === 'Bursary') {
        navigate(`/bursary/${institutionId}/${staffToken}/bursarydashboard`);
      }
      

       
      
        
       
        
       else {
        // Verification failed
        setIsError(true);
        setMessage('Verification Error: ' + result.message);
        console.error('Verification Error:', result);
      }
    } catch (error) {
      // Handle errors, but still set loading state to false
      setIsError(true);
      setMessage('Verification Error: ' + error.message);
      console.error('Verification Error:', error);
    } finally {
      setIsLoading(false); // Ensure loading state is always updated
      console.log('Verification process completed.');
    }
  };
  
  
  
  
  
  return (
    <div className="flex flex-col md:w-1/2 m-auto flex-1 items-center gap-y-[50px] p-5">
      <h4 className="font-bold">Enter Verification token</h4>
      <input
        type="text"
        maxLength="5" // Assuming the verification token is 5 digits
        className="border border-slate-300 text-center py-2 mb-4"
        ref={inputRef}
        value={verificationCode}
        onChange={handleInputChange}
      />

      {isLoading ? <Spinner /> : null}

      {isError ? <p className="text-red-500">{message}</p> : null}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleVerification}
      >
        Verify
      </button>
    </div>
  );
}

export default VerifyLogin;
