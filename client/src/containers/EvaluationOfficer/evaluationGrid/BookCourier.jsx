import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import remitaImg from '../../../assets/remita.png';
import { CountryDropdown } from '../../../components';

function BookCourier() {
  const { data } = useParams();

  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [itemType, setItemType] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can use the form data stored in state variables
  };

  return (
    <div className='p-5'>
      <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
        <h4 className='font-bold'>{data}</h4>

        <button className='md:w-4/12 mx-auto bg-gray-300' onClick={() => {}}>
          Request Courier Service From {data}
        </button>

        <h4 className='font-bold text-center'>Fill the Form below</h4>
        <p className='text-[14px] font-light text-center'>
          When booking courier services, please ensure that you carefully and accurately fill out the form below.
          Double-check all the information you provide for accuracy.
        </p>

        <form className='md:w-8/12 m-auto grid md:grid-cols-2 gap-y-[25px] p-5' onSubmit={handleFormSubmit}>
          {/* Sender Information */}
          <input
            type='text'
            placeholder='Sender Name'
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className='custom-textfield border-2 border-black border-solid rounded-md p-2'
          />
          <input
            type='text'
            placeholder='Sender Address'
            value={senderAddress}
            onChange={(e) => setSenderAddress(e.target.value)}
            className='custom-textfield border-2 border-black border-solid rounded-md p-2'
          />

          {/* Recipient Information */}
          <input
            type='text'
            placeholder='Recipient Name'
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className='custom-textfield border-2 border-black border-solid rounded-md p-2'
          />
          <input
            type='text'
            placeholder='Recipient Address'
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className='custom-textfield border-2 border-black border-solid rounded-md p-2'
          />

          {/* Item Details */}
          <input
            type='text'
            placeholder='Item Type'
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
            className='custom-textfield border-2 border-black border-solid rounded-md p-2'
          />

          {/* Delivery Preferences */}
          <select
            className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
          >
            <option value=''>Select Document To Deliver</option>
            <option value=''>item 1</option>
            <option value=''>item 2</option>
            <option value=''>item 2</option>
          </select>

          

          {/* Submit Button */}
          <button className='md:w-4/12 mx-auto bg-purple-700 border-2 rounded-md p-2' type='submit'>
            Book Courier
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookCourier;
