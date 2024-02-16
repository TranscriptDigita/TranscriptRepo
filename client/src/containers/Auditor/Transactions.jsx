import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { NewRequestTable, TransactionsTable } from '../../components';
import { useParams } from 'react-router-dom';

function Transactions() {
  const [payments, setPayments] = useState([]);
  const getStaffInstitutionId = () => {
    const storedUserData = localStorage.getItem('staff');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.institution;
      
    }
    return null;
};

const institutionId = getStaffInstitutionId();

  useEffect(() => {
    const apiUrl = `https://dacs.onrender.com/api/v1/transcript/institution/payments/${institutionId}`;

    Axios.get(apiUrl)
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  }, [institutionId]);

  const headers = [
    { title: 'Alumni Name' },
    { title: 'Reference' },
    { title: 'Payment Status' },
    { title: 'Amount' },
    { title: 'Paid At' },
    { title: 'Payment Channel' },
    { title: 'Currency' },
    { title: 'Payment Account Name' },
    { title: 'Bank' },
  ];

  const formattedItems = payments.map((payment) => ({
    'Alumni Name': payment.alumniName,
    'Reference': payment.reference,
    'Payment Status': payment.paymentStatus,
    'Amount': payment.amount,
    'Paid At': payment.paidAt,
    'Payment Channel': payment.paymentChennel,
    'Currency': payment.currency,
    'Payment Account Name': payment.paymentAccountName,
    'Bank': payment.bank,
  }));

  return (
    <div>
      {payments.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <TransactionsTable headers={headers} items={formattedItems} />
      )}
    </div>
  );
}

export default Transactions;
