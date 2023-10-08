import React, { useState, useEffect } from 'react';

function ListInformation({ title }) {
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    // Make the GET request to the API
    fetch('https://transcriptdigita-api.onrender.com/api/v1/transcript/track', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTrackingData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='flex flex-col gap-y-4 md:p-5'>
      <h4 className='text-black font-inter font-bold text-16'>{title}</h4>
      <div className='flex flex-col gap-y-2'>
        {/* Render the tracking data here */}
        {trackingData && (
          <React.Fragment>
            <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-4'>
              <p className='text-black font-inter font-bold text-14'>Name :</p>
              <p className='text-black font-inter font-bold text-14'>{trackingData.recipientName}</p>
            </span>

            <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
              <p className='text-black font-inter font-bold text-14'>Reg no :</p>
              <p className='text-black font-inter font-bold text-14'>{trackingData.deliveryAddress}</p>
            </span>

            <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
              <p className='text-black font-inter font-bold text-14'>Department :</p>
              <p className='text-black font-inter font-bold text-14'>{trackingData.deliveryContact}</p>
            </span>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default ListInformation;
