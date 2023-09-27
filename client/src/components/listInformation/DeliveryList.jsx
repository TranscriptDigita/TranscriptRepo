//List For Delivery Address Details

import React from 'react'

function DeliveryList({title}) {
  return (
    <div className='flex flex-col gap-y-4 md:p-5  '>
        <h4 className='text-black font-inter font-bold text-16'>{title}</h4>
        <div className='flex flex-col gap-y-2'>
            <span className='flex gap-x-4'>
                <p className='text-black font-inter font-bold text-14'>Address</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Manoah Luka k</p>
            </span> 

            <span className='flex gap-x-2'>
            <p className='text-black font-inter font-bold text-14'>State</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Uj/2015/ns/0190</p>
            </span>  

            <span className='flex gap-x-2'>
            <p className='text-black font-inter font-bold text-14'>Phone Number</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Mathematics</p>
            </span> 

            
        </div>
    </div>
  )
}

export default DeliveryList