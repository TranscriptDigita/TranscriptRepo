import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper 
    , FormControlLabel, Radio, RadioGroup, Checkbox
} from '@material-ui/core';

function Prices() {
    const getStaffInstitutionId = () => {
        const storedUserData = localStorage.getItem('staff');
        if (storedUserData) {
            const userDataObject = JSON.parse(storedUserData);
            return userDataObject?.institution;
        }
        return null;
    };




    const [documentsToUpload, setDocumentsToUpload] = useState('');

//   const handleDocumentChange = (event) => {
//     const { checked, value } = event.target;
//     if (checked) {
//       setDocumentsToUpload([...documentsToUpload, value]);
//     } else {
//       setDocumentsToUpload(documentsToUpload.filter((doc) => doc !== value));
//     }
//   };

  
      
      
      
 

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
      body: JSON.stringify({ typeOfDocument, amount, documentsToUpload }),
    };
    console.log('values of ', typeOfDocument, amount, documentsToUpload)

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
//   window.location.reload();






  return (
    <div className="container mx-auto p-4">
      <Typography variant="h6">Set Document Processing Amount </Typography>
      <form onSubmit={handleSubmit} className="mt-4">
      {/* <FormControl component="fieldset">
        <Typography variant="subtitle1">Type of Document</Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Certificate"
          value="Certificate"
          onChange={handleDocumentChange}
          checked={documentsToUpload.some((doc) => doc.name === 'Certificate')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Statement Of Result"
          value="Statement Of Result"
          onChange={handleDocumentChange}
          checked={documentsToUpload.some((doc) => doc.name === 'Statement Of Result')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Transcript"
          value="Transcript"
          onChange={handleDocumentChange}
          checked={documentsToUpload.some((doc) => doc.name === 'Transcript')}
        />
      </FormControl> */}

      <TextField
            fullWidth
            id="documentsToUpload"
            label="Write Out Documents Students need To Upload To Complete Each Application Process separated with Comas (e.g Certificate, Statement)"
            variant="outlined"
            value={documentsToUpload}
            onChange={(e) => setDocumentsToUpload(e.target.value)}
          />
      
        <div className="mb-4 mt-10">
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

       

    </div>
  );
}

export default Prices;
