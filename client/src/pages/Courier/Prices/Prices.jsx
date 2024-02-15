import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Modal } from '@mui/material';

function SetDeliveryPrice() {
    const { id, token } = useParams();
    const [formData, setFormData] = useState({
        weDoInternationalDelivery: '',
        localDeliveryPrice: '',
        internationalDeliveryPrice: ''
    });

    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await Axios.patch(`https://dacs.onrender.com/api/v1/courier-service/set-price/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
             // Show the success modal
      handleShowModal();
            // Handle success
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    return (
        <div className="mx-auto max-w-lg p-4">
            <Typography variant="h5" gutterBottom>
                Set Delivery Price
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Do you do international delivery? (Yes/No)</InputLabel>
                <Select
                    label="Do you do international delivery? (Yes/No)"
                    name="weDoInternationalDelivery"
                    value={formData.weDoInternationalDelivery}
                    onChange={handleChange}
                >
                    <MenuItem value="true">Yes</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Local Delivery Price (in naira)"
                name="localDeliveryPrice"
                value={formData.localDeliveryPrice}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
            />
            <TextField
                fullWidth
                label="International Delivery Price (in naira)"
                name="internationalDeliveryPrice"
                value={formData.internationalDeliveryPrice}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
            />
            <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: 'blue', color: 'white' }}>
    Submit
</Button>



                {/* Success Modal */}
                <Modal open={showModal} onClose={handleCloseModal}>
        <div className="bg-white p-4 rounded shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h3 className="text-xl font-semibold mb-2">Price Update</h3>
          <p>Prices Updated Successfully</p>
          <Button variant="contained" color="primary" style={{ backgroundColor: 'blue', color: 'white' }} onClick={handleCloseModal} fullWidth className="mt-4">
            Close
          </Button>
        </div>
      </Modal>




        </div>





    );
}

export default SetDeliveryPrice;
