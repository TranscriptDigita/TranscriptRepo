import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const SetDeliveryPrice = () => {
  const [formData, setFormData] = useState({
    weDoInternationalDelivery: '',
    localDeliveryPrice: '',
    internationalDeliveryPrice: '',
  });

  const [priceUpdates, setPriceUpdates] = useState([]);
  const { id, token } = useParams();
  useEffect(() => {
    // Fetch price updates when the component mounts
    fetchPriceUpdates();
  }, []);

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchPriceUpdates = async () => {
    try {
      // Fetch price updates from the server
      const response = await axios.get('https://your-api-base-url/price-updates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the state with fetched data
      setPriceUpdates(response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handlePatchDeliveryPrice = async () => {
    try {
      // Make the PATCH request to update delivery price
      await axios.patch(`https://dacs.onrender.com/api/v1/courier-service/set-price/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch updated price updates after successful PATCH
      fetchPriceUpdates();
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  return (
    <div className='p-5'>
      <div className='mb-4'>
        <TextField
          id='outlined-select-weDoInternationalDelivery'
          select
          label='International Delivery'
          name='weDoInternationalDelivery'
          value={formData.weDoInternationalDelivery}
          onChange={inputChange}
          variant='outlined'
          fullWidth
        >
          <option value='true'>Yes</option>
          <option value='false'>No</option>
        </TextField>
      </div>
      <div className='mb-4'>
        <TextField
          id='outlined-number-localDeliveryPrice'
          label='Local Delivery Price (in naira)'
          type='number'
          name='localDeliveryPrice'
          value={formData.localDeliveryPrice}
          onChange={inputChange}
          variant='outlined'
          fullWidth
        />
      </div>
      <div className='mb-4'>
        <TextField
          id='outlined-number-internationalDeliveryPrice'
          label='International Delivery Price (in naira)'
          type='number'
          name='internationalDeliveryPrice'
          value={formData.internationalDeliveryPrice}
          onChange={inputChange}
          variant='outlined'
          fullWidth
        />
      </div>
      <div className='mb-4'>
        <Button
          variant='contained'
          className='bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase'
          onClick={handlePatchDeliveryPrice}
        >
          Set Delivery Price
        </Button>
      </div>
      <div>
        <h2 className='text-lg font-bold mb-2'>Price Updates</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>International Delivery</TableCell>
                <TableCell>Local Delivery Price</TableCell>
                <TableCell>International Delivery Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceUpdates.map((update) => (
                <TableRow key={update.timestamp}>
                  <TableCell>{update.timestamp}</TableCell>
                  <TableCell>{update.weDoInternationalDelivery}</TableCell>
                  <TableCell>{update.localDeliveryPrice}</TableCell>
                  <TableCell>{update.internationalDeliveryPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default SetDeliveryPrice;
