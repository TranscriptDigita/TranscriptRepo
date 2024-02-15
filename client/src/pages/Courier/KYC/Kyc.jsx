import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { useParams } from 'react-router-dom';

const KYCForm = () => {
  const [formData, setFormData] = useState({
    headOfficeAddress: '',
    contactPhoneNumber: '',
    businessRegistrationNumber: '',
    directorName: '',
    directorContactNumber: '',
    directorIdType: '',
    directorIdNumber: '',
  });

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const { id, token } = useParams();

  useEffect(() => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      const { logistic } = userDataObject || {};

      // Check if values exist and populate the form data
      if (logistic) {
        setFormData(logistic);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make PATCH request
      const response = await axios.patch(
        `https://dacs.onrender.com/api/v1/courier-service/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('KYC PATCH Response:', response.data);

      // Show the success modal
      handleShowModal();
    } catch (error) {
      console.error('KYC PATCH Error:', error.response ? error.response.data : error.message);
      // Handle error, show an error message, etc.
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const getFieldFromLocalStorage = (fieldName) => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.logistic?.[fieldName];
    }
    return null;
  };
  
  // const isEditable = Object.keys(formData).every((field) => getFieldFromLocalStorage(field) === null);
  
  // const isKycSubmitted = Object.values(formData).every((value) => value !== '');

  // const isEditable = !Object.keys(formData).every((field) => getFieldFromLocalStorage(field) === null);


  // const isKycSubmitted = !Object.keys(formData).every((field) => getFieldFromLocalStorage(field) === null);





  

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">KYC Form</h2>

        <TextField
          label="Head Office Address"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="headOfficeAddress"
          value={formData.headOfficeAddress}
          onChange={handleChange}
          
        />

        <TextField
          label="Contact Phone Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="contactPhoneNumber"
          value={formData.contactPhoneNumber}
          onChange={handleChange}
          
        />

        <TextField
          label="Business Registration Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="businessRegistrationNumber"
          value={formData.businessRegistrationNumber}
          onChange={handleChange}
         
        />

        <TextField
          label="Director Name"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="directorName"
          value={formData.directorName}
          onChange={handleChange}
          
        />

        <TextField
          label="Director Contact Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="directorContactNumber"
          value={formData.directorContactNumber}
          onChange={handleChange}
          
        />

        <FormControl variant="outlined" fullWidth style={{ marginBottom: '1rem' }}>
          <InputLabel>Director ID Type</InputLabel>
          <Select
            label="Director ID Type"
            name="directorIdType"
            value={formData.directorIdType}
            onChange={handleChange}
            
          >
            <MenuItem value="National ID Card">National ID Card</MenuItem>
            <MenuItem value="Passport">Passport</MenuItem>
            <MenuItem value="Drivers License">Drivers License</MenuItem>
            <MenuItem value="Voters Card">Voters Card</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Director ID Number"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '1rem' }}
          name="directorIdNumber"
          value={formData.directorIdNumber}
          onChange={handleChange}
          
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: '1rem' }}
        
        >
          {/* {isKycSubmitted ? 'Submit' : 'KYC Submitted'} */}
          Submit/Edit KYC
        </Button>
      </form>

      {/* Success Modal */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <div className="bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-xl font-semibold mb-2">KYC Verification Successful</h3>
          <p>Your KYC has been successfully updated!</p>
          <Button variant="contained" color="primary" onClick={handleCloseModal} fullWidth className="mt-4">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default KYCForm;
