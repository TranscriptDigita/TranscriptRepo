// mui imports
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// react imports
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function OurPartners() {
  const [partners, setPartners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dacs.onrender.com/api/v1/institution/')
      .then(response => response.json())
      .then(data => {
        // Extract partner names from the data and update the state
        const partnerNames = data.map(institution => institution.name);
        setPartners(partnerNames);
      })
      .catch(error => {
        console.error('Error fetching partners:', error);
      });
  }, []);

  useEffect(() => {
    // Automatically slide partners every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === partners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup the interval
  }, [partners.length]);

  const goToPreviousPartner = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? partners.length - 1 : prevIndex - 1
    );
  };

  const goToNextPartner = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === partners.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='py-16 bg-purple-100'>
      <div className='container mx-auto'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl md:text-5xl  mb-2 font-montserrat-bold text-purple-900'>Our Partners</h2>
          <p className='text-lg md:text-xl text-gray-700 font-montserrat'>We collaborate with reputable institutions and organizations to provide top-quality services.</p>
        </div>

        <div className='relative'>
          <div className='overflow-hidden'>
            {/* Render the current partner */}
            <div className='partner-slide flex justify-center'>
              <button onClick={goToPreviousPartner} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10">
                <KeyboardArrowLeftIcon />
              </button>
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className={`w-full transition-transform duration-500 transform ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <div className='bg-white p-4 rounded shadow-md text-center'>
                  <h3 className='text-xl font-montserrat-semibold mb-2'>{partner.toUpperCase()}</h3>

                    {/* <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus feugiat lacus id neque dapibus, sit amet sodales neque lacinia.</p> */}
                  </div>
                </div>
              ))}
              <button onClick={goToNextPartner} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full z-10">
                <KeyboardArrowRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurPartners;
