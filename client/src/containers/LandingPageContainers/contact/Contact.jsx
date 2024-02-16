import React, { useState } from 'react';
import { TextField } from '@mui/material';

import contactImg from '../../../assets/contact.png';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {
      const response = await fetch('https://dacs.onrender.com/api/v1/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        console.error('Failed to submit form:', response.statusText);
      } else {
        const data = await response.json();
        console.log('Form submitted successfully:', data);
        // You can add further logic or state updates here if needed.
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };

  return (
    <div  className='flex-1 flex flex-col md:-mx-5'>
      <div className='flex flex-col items-center justify-items-center justify-center'>
        <div className='md:w-[1064px] md:h-[478px] md:p-5 p-3 bg-[#6B3FA0] bg-opacity-10 w-full grid grid-cols-1 md:grid-cols-2 my-12 items-center rounded-md'>
          <div className='flex flex-col gap-y-[16px]'>
            <div className='flex flex-col gap-y-[8px]'>
              <h5 className='text-[24px] md:text-[12px]'>Talk to us</h5>
              <p className='md:text-[16px] text-[8px] font-light'>let us know how we can help you</p>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-[10px] md:w-9/12 w-full'>
              <TextField
                id="outlined-text-input1"
                label="enter name"
                type="text"
                name="name"
                onChange={inputChange}
                value={formData.name}
              />

              <TextField
                id="outlined-text-input2"
                label="enter email"
                type="text"
                name="email"
                onChange={inputChange}
                value={formData.email}
              />

              <TextField
                id="outlined-text-input3"
                label="enter message"
                type="text"
                name="message"
                onChange={inputChange}
                value={formData.message}
                multiline
                rows={4}
              />
              <button type='submit'>Submit</button>
            </form>
          </div>
          <div className='flex md:h-[356px]'>
            <img src={contactImg} alt="contactImg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
