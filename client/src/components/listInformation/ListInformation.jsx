import React, { useState, useEffect } from 'react';

function ListInformation({ title, degreetype,  department, matricno, modeOfDelivery, createdAt }) {
  const [trackingData, setTrackingData] = useState(null);

  
  

  return (
    <div className='flex flex-col gap-y-4 md:p-5'>
      <h4 className='text-black font-inter font-bold text-16'>{title}</h4>
      <div className='flex flex-col gap-y-2'>
       
      <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-4'>
                <p className='text-black font-inter font-bold text-14'>Degree Type :</p>
                <p className='text-black font-inter font-bold text-14'>{degreetype}</p>
              </span>
  
              <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Faculty :</p>
                <p className='text-black font-inter font-bold text-14'>{modeOfDelivery}</p>
              </span>
  
              <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Department :</p>
                <p className='text-black font-inter font-bold text-14'>{department}</p>
              </span>
  
              <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Reg no :</p>
                <p className='text-black font-inter font-bold text-14'>{matricno}</p>
              </span>
  
              
  
              <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Mode Of Delivery :</p>
                <p className='text-black font-inter font-bold text-14'>{modeOfDelivery}</p>
              </span>
  
              <span className='flex flex-col gap-y-2 md:flex-row md:gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Date Applied :</p>
                <p className='text-black font-inter font-bold text-14'>{createdAt}</p>
              </span>
        
      </div>
    </div>
  );
}

export default ListInformation;
