import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal } from '@material-ui/core';

function Prices() {
    const getStaffInstitutionId = () => {
        const storedUserData = localStorage.getItem('staff');
        if (storedUserData) {
            const userDataObject = JSON.parse(storedUserData);
            return userDataObject?.institution;
        }
        return null;
    };


    const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
      
      
      
 

    const institutionId = getStaffInstitutionId();
    const { token: staffToken } = useParams();
  const [typeOfDocument, setTypeOfDocument] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);
  const [documentsPrices, setDocumentsPrices] = useState([]);


  useEffect(() => {
    const fetchDocumentsPrices = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/institution/${institutionId}/documents-price`);
        const data = await response.json();
        setDocumentsPrices(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDocumentsPrices();
  }, [institutionId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${staffToken}`,
      },
      body: JSON.stringify({ typeOfDocument, amount }),
    };

    try {
      const response = await fetch(`https://dacs.onrender.com/api/v1/staff/transcript-charge/${institutionId}`, requestOptions);
      const data = await response.json();
      setResponse(data);
      console.log("Response", data);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      setResponse({ error: 'An error occurred while processing your request.' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Typography variant="h6">Set Document Processing Amount</Typography>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <FormControl fullWidth>
            <InputLabel id="typeOfDocument-label">Type of Document</InputLabel>
            <Select
              labelId="typeOfDocument-label"
              id="typeOfDocument"
              value={typeOfDocument}
              onChange={(e) => setTypeOfDocument(e.target.value)}
            >
              <MenuItem value="">Select Type of Document</MenuItem>
              <MenuItem value="Personal Transcript">Personal Transcript</MenuItem>
              <MenuItem value="Official Transcript">Official Transcript</MenuItem>
              <MenuItem value="Certificate">Certificate</MenuItem>
              <MenuItem value="Statement of Result">Statement of Result</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mb-4">
          <TextField
            fullWidth
            id="amount"
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
      {response && (
        <div className="mt-4">
          {response.error ? <Typography style={{ color: 'red' }}>{response.error}</Typography> : <Typography>Document processing amount updated successfully!</Typography>}
        </div>
      )}

<div className="container mx-auto p-4">
      <Typography variant="h6">Documents Prices</Typography>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documentsPrices.map((documentPrice, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {documentPrice.document}
                </TableCell>
                <TableCell align="right">{documentPrice.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>

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
}

export default Prices;
