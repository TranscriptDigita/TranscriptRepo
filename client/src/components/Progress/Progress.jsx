import React, { useState } from 'react';
import { Information, ListInformation } from './../';
import FullList from '../listInformation/FullList';
import DeliveryList from '../listInformation/DeliveryList';

// Define page components for each step
function Page1() {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Transcript Request Accepted`}
        message={`Dear Federal University Minna Administration,
        We are pleased to inform you that the transcript request for [Student Name] has been successfully accepted. Our team acknowledges the importance of this request and is dedicated to processing it promptly.
        Please note that the processing time may take up to two weeks due to the high volume of requests we receive. We appreciate your patience during this period as we ensure the accuracy and quality of the transcripts we provide.`}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation title={`Student Information`} />
      </div>
    </div>
  ); // Content for the first step
}

function Page2() {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Processing Transcript`}
        message={`Dear Federal university Minna Administration,
        We are pleased to inform you that the transcript request for 
        [Student Name] has been successfully accepted. Our team 
        acknowledges the importance of this request and is dedicated to processing it promptly.
        Please note that the processing time may take up to two 
        weeks due to the high volume of requests we receive. 
        We appreciate your patience during this period as we ensure 
        the accuracy and quality of the transcripts we provide..`}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation title={`Student Information`} />
      </div>
    </div>
  ); // Content for the second step
}

function Page3() {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <Information
        title={`Request Attended`}
        message={`Dear Federal university Minna Administration,
        We are pleased to inform you that the transcript request for [Student Name] 
        has been successfully accepted. Our team acknowledges the 
        importance of this request and is dedicated to processing it promptly.
        Please note that the processing time may take up to two weeks due to the 
        high volume of requests we receive. We appreciate your patience during 
        this period as we ensure the accuracy and quality of the transcripts we provide.`}
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <ListInformation title={`Student Information`} />
      </div>
    </div>
  ); // Content for the third step
}

function Page4() {
  return (
    <div className='flex flex-col flex-1 bg-white p-5 rounded-md gap-y-4'>
      <div className='grid grid-cols-2 gap-x-5'>
        <FullList title={`Student Information`} />
      </div>
      <div className='grid grid-cols-2 gap-x-5'>
        <DeliveryList title={`DeliveryDetails`} />
      </div>
    </div>
  ); // Content for the fourth step
}

function Progress({ verified = true }) {
  // State to keep track of the active step
  const [activeStep, setActiveStep] = useState(verified ? 1 : 0);

  // Array to define steps with labels and associated components
  const steps = [
    { label: 'Verified', component: <Page1 /> }, // First step with its label and associated component
    { label: 'Processing', component: <Page2 /> }, // Second step with its label and associated component
    { label: 'Accepted', component: <Page3 /> }, // Third step with its label and associated component
    { label: 'Delivered', component: <Page4 /> }, // Fourth step with its label and associated component
  ];

  // Function to handle step button click
  const handleStepClick = (step) => {
    // Check if verification is true before changing the active step
    if (verified) {
      setActiveStep(step);
    }
  };

  return (
    <div>
      {/* Render progress steps */}
      <div className='flex items-center'>
        {/* Map over each step and render step buttons */}
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Button for each step */}
            <div className=''>
              <button
                className={`flex justify-center p-2 h-10 w-10 rounded-full ml-2 mr-2 mt-5 ${
                  activeStep >= index + 1 ? 'bg-green-300' : 'bg-gray-300'
                }`}
                onClick={() => handleStepClick(index + 1)}
                disabled={!verified} // Disable the button if not verified
              >
                {/* Display checkmark or step number based on active step */}
                {activeStep >= index + 1 ? (
                  <span>&#10003;</span> // Checkmark
                ) : (
                  <span>{index + 1}</span> // Step number
                )}
              </button>
              <div>
                <p
                  className={`inline-block w-full ${
                    activeStep >= index + 1 ? 'text-green-600' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            </div>
            {/* Display step label (hidden on small screens) */}
            {index < steps.length - 1 && (
              <div className='w-full h-1 bg-gray-300' /> // Separator line
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Render the component for the active step */}
      <div>{steps[activeStep - 1].component}</div>
    </div>
  );
}

export default Progress;
