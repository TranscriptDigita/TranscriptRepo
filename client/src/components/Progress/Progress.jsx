import React, { useState, useEffect } from 'react';
import { Information, ListInformation } from './../';
import FullList from '../listInformation/FullList';
import DeliveryList from '../listInformation/DeliveryList';
import { Table, TranscriptGridItem } from '../../components';
import { useParams } from 'react-router-dom';

// Define a new page component for the initial status
function Page0({ schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Initial Status`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
    </div>
  );
}

// Define page components for each step
function Page1({ transcriptData, schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Transcript Request Accepted`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation
          title={`Student Information`}
          createdAt={transcriptData ? transcriptData.createdAt : ''}
          degreetype={transcriptData ? transcriptData.degreeType : ''}
          department={transcriptData ? transcriptData.department : ''}
          matricno={transcriptData ? transcriptData.matricNumber : ''}
          modeOfDelivery={transcriptData ? transcriptData.modeOfDelivery : ''}
        />
      </div>
    </div>
  ); // Content for the first step
}

function Page2({ transcriptData, schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Processing Transcript`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation
          title={`Student Information`}
          createdAt={transcriptData ? transcriptData.createdAt : ''}
          degreetype={transcriptData ? transcriptData.degreeType : ''}
          department={transcriptData ? transcriptData.department : ''}
          matricno={transcriptData ? transcriptData.matricNumber : ''}
          modeOfDelivery={transcriptData ? transcriptData.modeOfDelivery : ''}
        />
      </div>
    </div>
  ); // Content for the second step
}

function Page3({ transcriptData, schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Request Attended`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation
          title={`Student Information`}
          createdAt={transcriptData ? transcriptData.createdAt : ''}
          degreetype={transcriptData ? transcriptData.degreeType : ''}
          department={transcriptData ? transcriptData.department : ''}
          matricno={transcriptData ? transcriptData.matricNumber : ''}
          modeOfDelivery={transcriptData ? transcriptData.modeOfDelivery : ''}
        />
      </div>
    </div>
  ); // Content for the third step
}

function Page4({ transcriptData, schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Being Delivered`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation
          title={`Student Information`}
          createdAt={transcriptData ? transcriptData.createdAt : ''}
          degreetype={transcriptData ? transcriptData.degreeType : ''}
          department={transcriptData ? transcriptData.department : ''}
          matricno={transcriptData ? transcriptData.matricNumber : ''}
          modeOfDelivery={transcriptData ? transcriptData.modeOfDelivery : ''}
        />
      </div>
    </div>
  ); // Content for the fourth step
}

// Define a new page component for declined status
function Page5({ schoolName, studentName, status }) {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Request Declined`}
        schoolName={schoolName}
        studentName={studentName}
        status={status}
      />
    </div>
  );
}

function Progress() {
  // State to keep track of the active step
  const [activeStep, setActiveStep] = useState(0);
  const [transcript, setTranscript] = useState(null);
  const { id, data } = useParams();

  // Function to extract institution ID from stored data
  const getUserName = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.alumni?.fullName;
    }
    return null;
  };

  const name = getUserName();

  // Log the value of institutionId
  console.log('Student Name is:', name);
  console.log('School name is:', data);

  // Array to define steps with labels and associated components
  const steps = [
    { label: 'Initial', component: <Page0 schoolName={data} studentName={name} status="is approved and pending verification" /> }, // Initial step with its label and associated component
    { label: 'Verified', component: <Page1 transcriptData={transcript} schoolName={data} studentName={name} status="has been successfully submitted" /> }, // First step with its label and associated component
    { label: 'Processing', component: <Page2 transcriptData={transcript} schoolName={data} studentName={name} status="is being processed" /> }, // Second step with its label and associated component
    { label: 'Accepted', component: <Page3 transcriptData={transcript} schoolName={data} studentName={name} status="has been accepted and is being attended to" /> }, // Third step with its label and associated component
    { label: 'Delivered', component: <Page4 transcriptData={transcript} schoolName={data} studentName={name} status="has been successfully delivered" /> }, // Fourth step with its label and associated component
    { label: 'Declined', component: <Page5 schoolName={data} studentName={name} status="has been declined" /> }, // Fifth step with its label and associated component
  ];

  // Effect to fetch transcript data
  useEffect(() => {
    const fetchTranscript = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/transcript/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTranscript(data);
          console.log('Transcript Data:', data);
        } else {
          console.error('Failed to fetch transcript');
        }
      } catch (error) {
        console.error('Error fetching transcript', error);
      }
    };

    fetchTranscript();
  }, [id]);

  // Determine the active step based on the API response
  useEffect(() => {
    if (transcript) {
      if (transcript.isDeclined) {
        setActiveStep(5);
      } else if (transcript.isDelivered) {
        setActiveStep(4);
      } else if (transcript.isApproved) {
        setActiveStep(3);
      } else if (transcript.isQuerried) {
        setActiveStep(2);
      } else if (transcript.isVerified) {
        setActiveStep(1);
      } else {
        setActiveStep(0);
      }
    }
  }, [transcript]);

  return (
    <div>
       
      <button
        onClick={() => window.open(`/receipt/${id}`, '_blank', 'width=600,height=400')}
      >
        View Receipt
      </button>
      {/* Render the component for the active step */}
      <div>{steps[activeStep].component}</div>
      {/* Display transcript data if available */}
      {/* {transcript && (
        <div>
          <p>Transcript Data: {JSON.stringify(transcript)}</p>
        </div>
      )} */}
    </div>
  );
}

export default Progress;
