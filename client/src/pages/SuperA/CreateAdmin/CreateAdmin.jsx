import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminList } from '../../../containers';

function CreateAdmin() {
  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  const navigate = useNavigate();

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { admin } = useSelector((state) => state.institution);

  const handleCreateAdmin = async () => {
    try {
      // Get the Bearer token from local storage
      const superAdminData = JSON.parse(localStorage.getItem('SuperAdmin'));
      const token = superAdminData.admin.token;

      // Log the values being sent to the API
      console.log('Email:', formData.emailAddress);
      console.log('Password:', formData.password);

      // Make the API request
      const response = await fetch('https://dacs.onrender.com/api/v1/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // Parse the response
      const data = await response.json();

      // Check if admin creation was successful
      if (response.ok) {
        console.log('Admin created successfully:', data);

        // Show success message
        toast.success('New admin user created successfully');

       
      } else {
        // Log the error message
        console.error('Admin creation failed:', data.message);

        // Show error message
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during admin creation:', error);

      // Show a generic error message
      toast.error('An error occurred during admin creation');
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
        <div className="flex flex-col gap-y-4">
          <TextField
            id="outlined-email-input"
            label="Email Address"
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={inputChange}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
            value={formData.password}
            onChange={inputChange}
          />
        </div>
        <Button
          variant="contained"
          className="bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase"
          onClick={handleCreateAdmin}
        >
          Create
        </Button>
        <AdminList/>
      </div>
      {/* ToastContainer for displaying pop-up messages */}
      <ToastContainer />
    </div>
  );
}

export default CreateAdmin;
