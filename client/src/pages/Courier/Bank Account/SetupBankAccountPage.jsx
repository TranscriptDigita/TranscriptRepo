import React, { useState } from 'react';
import Axios from 'axios';
import { TextField, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useParams } from 'react-router-dom';

function SetupBankAccountPage() {
    const [formData, setFormData] = useState({
        bankName: '',
        bankSortCode: '',
        accountName: '',
        accountNumber: ''
    });
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const { bankName, bankSortCode, accountName, accountNumber } = formData;

        // PATCH request to set up bank account details
        Axios.patch(`https://dacs.onrender.com/api/v1/courier-service/setup-account/${id}`, {
            bankName,
            bankSortCode,
            accountName,
            accountNumber
        })
        .then(response => {
            console.log('Bank account details set up successfully:', response.data);
            // Optionally, you can perform additional actions here if needed
            setLoading(false);
            setError(null);
            setSuccess(true); // Set success to true
            setOpenDialog(true); // Open the dialog
            // Reset form data
            setFormData({
                bankName: '',
                bankSortCode: '',
                accountName: '',
                accountNumber: ''
            });
        })
        .catch(error => {
            console.error('Error setting up bank account details:', error);
            setError('An error occurred. Please try again.');
            setLoading(false);
            setOpenDialog(true); // Open the dialog
        });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    return (
        <div className="max-w-md mx-auto my-8 p-6 bg-white shadow-md rounded-md">
            <Typography variant="h5" component="h2" gutterBottom>
                Set Up Bank Account Details
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Bank Name"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Bank Sort Code"
                    name="bankSortCode"
                    value={formData.bankSortCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Account Name"
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Account Number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    fullWidth
                    className="mt-4"
                    style={{ backgroundColor: '#8A2BE2', color: '#fff' }} // Purple color
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                {error && <Typography color="error">{error}</Typography>}

                {/* Dialog for displaying error or success message */}
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>{success ? 'Success' : 'Error'}</DialogTitle>
                    <DialogContent>
                        <Typography>{success ? 'Bank account details set up successfully!' : error}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </form>
        </div>
    );
}

export default SetupBankAccountPage;
