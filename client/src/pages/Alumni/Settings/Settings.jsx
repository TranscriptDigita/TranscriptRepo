import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Settings() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
      emailAddress: '',
      fullname: '',
      verificationCode: '',  // Remove the default verification code
      newPassword: '',
      confirmPassword: '',
    });
  
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.institution);
  
    useEffect(() => {
      const fetchAlumniDetails = async () => {
        try {
          const response = await fetch(`https://dacs.onrender.com/api/v1/alumnus/${id}`);
          const data = await response.json();
  
          console.log('API Response:', data);
  
          setFormData({
            emailAddress: data.data.emailAddress,
            fullname: data.data.fullName,
            verificationCode: '', // Do not set the verification code here
            newPassword: '',
            confirmPassword: '',
          });
        } catch (error) {
          console.error('Error fetching alumni details:', error);
        }
      };
  
      console.log('Alumni ID:', id);
  
      fetchAlumniDetails();
    }, [id]);
  
    const inputChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handlePasswordChange = async () => {
      try {
        if (showPasswordFields) {
          // Check if the reset token is available
          if (!formData.verificationCode) {
            console.error('Reset token is missing');
            return;
          }
  
          // Make API call to update the password
          const response = await fetch(`https://dacs.onrender.com/api/v1/alumnus/reset-password/${formData.verificationCode}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              password: formData.newPassword,
            }),
          });
  
          console.log('Email Address:', formData.emailAddress);
          console.log('API Response:', response);
  
          if (response.ok) {
            console.log('Password successfully changed');
            toast.success('Password changed successfully!', { autoClose: 3000 });
            // You can redirect or show a success message here
          } else {
            console.error('Error changing password:', await response.text());
          }
        } else {
          const response = await fetch('https://dacs.onrender.com/api/v1/alumnus/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              emailAddress: formData.emailAddress,
            }),
          });
  
          const responseData = await response.json();
  
          console.log('Email Address:', formData.emailAddress);
          console.log('Forgot Password API Response:', responseData);
  
         
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col md:w-4/12 w-full gap-y-4 p-3 md:p-0">
          {isLoading ? <Spinner /> : ''}
          <div className="flex flex-col gap-y-4">
            <TextField
              id="outlined-email-input"
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={inputChange}
              disabled
            />
            <TextField
              id="outlined-password-input"
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={inputChange}
              disabled
            />
  
            {showPasswordFields && (
              <>
                <TextField
                  id="verification-code"
                  type="text"
                  name="verificationCode"
                  label="Verification Code"
                  value={formData.verificationCode}
                  onChange={inputChange}
                 
                />
                <p>Verification code sent to your email address</p>
  
                <TextField
                  id="new-password"
                  type="password"
                  name="newPassword"
                  label="New Password"
                  value={formData.newPassword}
                  onChange={inputChange}
                />
  
                <TextField
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={inputChange}
                />

                <TextField
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={inputChange}
                />

                <TextField
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={inputChange}
                />
              </>
            )}
          </div>
  
          <Button
            variant="contained"
            className="bg-[#6B3FA0] hover:bg-[#6B3FA0]"
            onClick={() => {
              setShowPasswordFields(!showPasswordFields);
              handlePasswordChange();
            }}
          >
            {showPasswordFields ? 'Change Password' : 'Send Reset Password Email'}
          </Button>
  
          <Link to={`/institution/signup`}>
            <Button
              variant="text"
              className="bg-[#CCCCCC] text-slate-900 hover:bg-[#CCCCCC]"
              style={{ width: '100%' }}
            >
              <span style={{ textAlign: 'center', color: 'white' }}>Update Record</span>
            </Button>
          </Link>
        </div>
         {/* Toast container for showing success messages */}
    <ToastContainer />
      </div>
    );
  }
  
  export default Settings;