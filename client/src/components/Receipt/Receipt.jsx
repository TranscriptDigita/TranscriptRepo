import React, { useState, useRef, useEffect } from 'react';
import { Grid, Typography, Paper, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import lumniImg from '../../assets/lumni.png'


function Receipt() {

 const [invoiceData, setInvoiceData] = useState(null);
const {id} = useParams(); 

  useEffect(() => {
    fetch(`https://dacs.onrender.com/api/v1/transcript/payment-data/${id}`)
        .then(response => response.json())
        .then(data => setInvoiceData(data))
        .catch(error => console.error('Error fetching data:', error));
}, [id]);

if (!invoiceData) {
    return <p>Loading...</p>;
}



return (

<div className="container mx-auto">
             <div className="bg-white border rounded-lg shadow-lg px-8 py-6 my-8">
             <div className="flex justify-center">
                    <img src={lumniImg} alt="Company Logo" className="w-40" />
                    
                </div>
                <div className="flex justify-center">
                    
                <h3 className="text-lg font-bold text-gray-800"> {invoiceData.institutionName}</h3>
                </div>
                <div className="flex justify-center">
                     <div>
                         <h2 className="text-xl font-bold text-gray-800">Invoice #{invoiceData.reference}</h2>
                         {/* <p className="text-sm font-bold text-gray-600">Generated on {new Date().toLocaleDateString()}</p> */}
                     </div>
    
                 </div>
                 <div className="flex justify-center">
                     <div>
                         {/* <h2 className="text-xl font-bold text-gray-800">Invoice #{invoiceData.reference}</h2> */}
                         <p className="text-sm font-bold text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                     </div>
    
                 </div>
                 <div className="mt-6">
                     <h3 className="text-lg font-bold text-gray-800">Customer Information</h3>
                     <div className="flex justify-between">
                         <div>
                             <p className="text-sm text-gray-600"><span className="font-bold">Name:</span> {invoiceData.alumniName}</p>
                             {/* <p className="text-sm text-gray-600"><span className="font-bold">Email:</span> {invoiceData.customerEmail}</p>
                             <p className="text-sm text-gray-600"><span className="font-bold">Phone:</span> {invoiceData.customerPhone}</p> */}
                         </div>
                         <div>
                             {/* <p className="text-sm text-gray-600"><span className="font-bold">Address:</span> {invoiceData.customerAddress}</p> */}
                         </div>
                     </div>
                 </div>
                 <div className="mt-6">
                     <h3 className="text-lg font-bold text-gray-800">Payment Details</h3>
                     <table className="w-full mt-4">
                         <thead>
                             <tr className="bg-gray-200">
                                 <th className="px-4 py-2">Field</th>
                                 <th className="px-4 py-2">Value</th>
                             </tr>
                         </thead>
                         <tbody>
                             {/* {Object.entries(invoiceData).map(([key, value]) => (
                                 <tr key={key}>
                                     <td className="border px-4 py-2">{key}</td>
                                     <td className="border px-4 py-2">{value}</td>
                                 </tr>
                             ))} */}

                                <tr>
                                     <td className="border px-4 py-2">Institution Name</td>
                                     <td className="border px-4 py-2">{invoiceData.institutionName}</td>
                                 </tr> 
                                <tr>
                                     <td className="border px-4 py-2">Id</td>
                                     <td className="border px-4 py-2">{invoiceData._id}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Reference Id</td>
                                     <td className="border px-4 py-2">{invoiceData.reference}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Payment Status</td>
                                     <td className="border px-4 py-2">{invoiceData.paymentStatus}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Payment Type</td>
                                     <td className="border px-4 py-2">{invoiceData.paymentChennel}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Currency</td>
                                     <td className="border px-4 py-2">{invoiceData.currency}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Amount</td>
                                     <td className="border px-4 py-2">{invoiceData.amount}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Account Name</td>
                                     <td className="border px-4 py-2">{invoiceData.paymentAccountName}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Bank</td>
                                     <td className="border px-4 py-2">{invoiceData.bank}</td>
                                 </tr>
                                 {/* <tr>
                                     <td className="border px-4 py-2">Time</td>
                                     <td className="border px-4 py-2">{invoiceData.createdAt}</td>
                                 </tr>
                                 <tr>
                                     <td className="border px-4 py-2">Time</td>
                                     <td className="border px-4 py-2">{invoiceData.updatedAt}</td>
                                 </tr> */}
                                 <tr>
                                     <td className="border px-4 py-2">Time</td>
                                     <td className="border px-4 py-2">{invoiceData.paidAt}</td>
                                 </tr>

                         </tbody>
                     </table>
                 </div>
             </div>
         </div>


)
}

export default Receipt

