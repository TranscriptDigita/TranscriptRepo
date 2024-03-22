import React from 'react';
import { Button, Typography } from '@material-ui/core';
import {  useParams } from 'react-router-dom';
import Logout from '../../Logout/Logout';



function Subscription() {
    const { id  } = useParams();
    const totallAmount = 200000;


    const getInstitutionEmail = () => {
        const storedUserData = localStorage.getItem('institutionUser');
        if (storedUserData) {
          const userDataObject = JSON.parse(storedUserData);
          return userDataObject?.institution?.emailAddress
          ;
        }
        return null;
      };
    
      const emailAddress = getInstitutionEmail();

      console.log('the email' ,emailAddress)

    function payWithPaystack() {
        var handler = PaystackPop.setup({
          key: 'pk_test_55b6e0a0423db47ed627b9764af86a1b6b7ef8f5', // This is a test  public key, we'll replace it later
          email: emailAddress, //put institution email email here
          amount: totallAmount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
          currency: 'NGN', 
          ref: id, //put the institution ID here
          callback: function(response) {
            //this happens after the payment is completed successfully
            var reference = response.reference;
            alert('Payment complete! Reference: ' + reference);
          },
          onClose: function() {
            alert('Transaction was not completed, window closed.');
          }
        });
        handler.openIframe();
      }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <Logout/>
        <Typography variant="h5" align="center" gutterBottom>
          You need to subscribe to premium to continue using our services.
        </Typography>
        <div className="mt-6">
          <Typography variant="h4" align="center" gutterBottom>
            ₦ 200,000
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mt-6"
            onClick={payWithPaystack}
          >
            Subscribe to Premium
          </Button>
          
        </div>
      </div>
    </div>
  );
}

function handleSubscribe() {
  // Implement subscription logic
  alert('You have subscribed to premium!');
}

export default Subscription;
