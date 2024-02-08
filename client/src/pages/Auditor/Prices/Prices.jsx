import React, { useState } from 'react';
import { TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Prices() {
    const getStaffInstitutionId = () => {
        const storedUserData = localStorage.getItem('staff');
        if (storedUserData) {
            const userDataObject = JSON.parse(storedUserData);
            return userDataObject?.institution;
        }
        return null;
    };

    const institutionId = getStaffInstitutionId();
    const { token: staffToken } = useParams();
    console.log("Value of the authorization token", staffToken);
    console.log("Value of Idssss", institutionId);

    const [transcriptType, setTranscriptType] = useState('official');
    const [prices, setPrices] = useState({
        official: 0,
        personal: 0,
    });
    const [tableData, setTableData] = useState([]);

    const handleTranscriptTypeChange = (event) => {
        setTranscriptType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrices((prevPrices) => ({
            ...prevPrices,
            [transcriptType]: parseFloat(event.target.value) || 0,
        }));
    };

    const handleUpdatePrices = async () => {
        try {
            const response = await axios.patch(
                `https://dacs.onrender.com/api/v1/staff/transcript-charge/${institutionId}`,
                {
                    typeOfTranscript: transcriptType === 'official' ? 'Official' : 'Personal',
                    amount: prices[transcriptType],
                },
                {
                    headers: {
                        Authorization: `Bearer ${staffToken}`,
                    },
                }
            );

            console.log('Prices updated successfully:', response.data);

            const newData = Object.keys(prices).map((type) => ({
                type: type === 'official' ? 'Official Transcript' : 'Personal Transcript',
                price: prices[type],
            }));

            setTableData(newData);
        } catch (error) {
            console.error('Error updating prices:', error);
        }
    };

    return (
        <div>
            <form>
                <TextField
                    select
                    label="Transcript Type"
                    value={transcriptType}
                    onChange={handleTranscriptTypeChange}
                >
                    <MenuItem value="official">Official Transcript</MenuItem>
                    <MenuItem value="personal">Personal Transcript</MenuItem>
                </TextField>

                <TextField
                    label="Price"
                    value={prices[transcriptType]}
                    onChange={handlePriceChange}
                />

                <Button
                    variant="contained"
                    style={{ backgroundColor: "green", marginLeft: "20px" }}
                    onClick={handleUpdatePrices}
                >
                    Update Prices
                </Button>
            </form>

            <TableContainer component={Paper} className='mt-20'>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Transcript Type</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.type}>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Prices;
