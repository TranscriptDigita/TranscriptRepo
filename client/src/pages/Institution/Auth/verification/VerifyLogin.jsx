import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../../../components';

function VerifyLogin() {
  const numFields = 5; // Number of verification code fields
  const [values, setValues] = useState(Array(numFields).fill(''));
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [institutionUserData, setInstitutionUserData] = useState(null);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id  } = useParams();

  useEffect(() => {
    inputRefs.current[0].focus(); // Set focus on the first input field when the component mounts
  }, []);

  const handleInputChange = (index, value) => {
    if (!isNaN(value) && value !== '') {
      const newValues = [...values];
      newValues[index] = value;
      setValues(newValues);

      if (index < numFields - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        // When all fields are filled, make the API call
        const verificationCode = newValues.join('');
        handleVerification(verificationCode);
      }
    }
  };

  const handlePaste = (event, index) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text/plain');
    const numbersOnly = pastedText.replace(/[^0-9]/g, '');
    const newValue = numbersOnly.charAt(0) || '';

    handleInputChange(index, newValue);
  };

  const handleBackspace = (index, event) => {
    if (event.key === 'Backspace') {
      const newValues = [...values];
      newValues[index] = '';

      setValues(newValues);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleVerification = async (verificationCode) => {
    setIsLoading(true);

    try {
        // Make API call to verify authentication
        const response = await fetch('https://dacs.onrender.com/api/v1/institution/verify-authentication', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verificationCode, id }), // Adjust the ID source accordingly
        });

        const result = await response.json();
        const isActivePackage = result.isActivePackage;
        setIsLoading(false);

         // Store the API response in local storage under 'institutionUser'
         localStorage.setItem('institutionUser', JSON.stringify(result));

        if (isActivePackage == true) {
            // If package is active, navigate to dashboard
            console.log('Package is active');
            navigate(`/institution/${id}/dashboard`);
        } else {
            // If package is not active, navigate to dashboard22
            console.log('Package is not active');
            navigate(`/subscription/${id}`);
        }
    } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setMessage('Verification Error: ' + error.message);
        console.error('Verification Error:', error);
    }
};

  return (
    <div className="flex flex-col md:w-1/2 m-auto flex-1 items-center gap-y-[50px] p-5">
      <h4 className="font-bold">Enter Verification token</h4>
      <form className="grid grid-cols-5 md:gap-x-5 gap-x-2">
        {Array.from({ length: numFields }, (_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="border border-slate-300 text-center py-2"
            ref={(el) => (inputRefs.current[index] = el)}
            value={values[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={(e) => handlePaste(e, index)}
            onKeyDown={(e) => handleBackspace(index, e)}
          />
        ))}
      </form>

      {isLoading ? <Spinner /> : null}

      <div className="flex flex-col">
        <p className="text-center">Please Insert the 5 digit token sent to your email</p>
        <p className="text-[#6B3FA0] text-center">{institutionUserData?.institution.emailAddress}</p>
      </div>
    </div>
  );
}

export default VerifyLogin;
