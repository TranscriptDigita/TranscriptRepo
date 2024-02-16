import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import remitaImg from '../../../assets/remita.png';
import { CountryDropdown } from '../../../components';
import { Grid, Typography, Paper, Button } from '@mui/material';


function AlumniDetailsForm() {

  // const handleDownloadClick = () => {
  //   // Convert invoiceData to a string (you may need to adjust the format)
  //   const dataString = JSON.stringify(invoiceData, null, 2);
  //   // Create a Blob with the data
  //   const blob = new Blob([dataString], { type: 'application/json' });
  //   // Create a temporary URL for the Blob
  //   const url = URL.createObjectURL(blob);
  //   // Create a temporary link element
  //   const link = document.createElement('a');
  //   // Set the link's attributes
  //   link.href = url;
  //   link.download = 'invoice.json';
  //   // Simulate a click on the link to trigger the download
  //   link.click();
  //   // Clean up by revoking the URL
  //   URL.revokeObjectURL(url);
  // };



  const getUserEmail = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.alumni?.emailAddress;
      
    }
    return null;
  };
  
  
  
  const userEmail = getUserEmail();
  console.log("User Email:", userEmail);
  


  const { data, id } = useParams(); 
  const decodedData = decodeURIComponent(data);



  const [courierServiceProviders, setCourierServiceProviders] = useState([]);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const [documentPrices, setDocumentPrices] = useState([]);

  let faculty, program, matricNumber, degreeType, department, yearOfGraduation, typeOfDocument;
  let modeOfDelivery, recipientCountry, recipientEmail, recipientPhoneNumber, recipientAddress, preferCourier;
  
  const tempData = JSON.parse(localStorage.getItem('tempData'));
  const tempDataD = JSON.parse(localStorage.getItem('tempDataD'));
  
  if (tempData) {
    ({ faculty, program, matricNumber, degreeType, department, yearOfGraduation, typeOfDocument } = tempData);
  }
  
  if (tempDataD) {
    ({ modeOfDelivery, recipientCountry, recipientEmail, recipientPhoneNumber, recipientAddress, preferCourier } = tempDataD);
  }
  
    const schoolCharge = typeOfDocument ? parseInt(typeOfDocument.split('-')[1].trim()) : 0;
    const deliveryCharge = preferCourier ? parseInt(preferCourier.split('₦')[1].trim()) : 0;
    const processingFee = 0.05 * schoolCharge;
    const total = schoolCharge + deliveryCharge + processingFee ;

    console.log("val", schoolCharge, deliveryCharge, processingFee, total)

    const [invoiceData, setInvoiceData] = useState(null);


    function payWithPaystack() {
      var handler = PaystackPop.setup({
        // key: 'pk_test_55b6e0a0423db47ed627b9764af86a1b6b7ef8f5',
        key: 'pk_live_b586f423b250b6270f1df76df842c8cd4bee30dc', // This is a test  public key, we'll replace it later
        email: userEmail,
        amount: total * 100 , // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: 'NGN', 
        ref: transcriptId, //put the transcript/document ID here
        callback: function(response) {
          //this happens after the payment is completed successfully
          var reference = response.reference;
          alert('Payment complete! Reference: ' + reference);
          setActiveForm(4);
        },
        onClose: function() {
          alert('Transaction was not completed, window closed.');
         
        },
      });
      
      handler.openIframe();
      
    }






  useEffect(() => {
    const fetchDocumentPrices = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/institution/${id}/documents-price`);
        if (response.ok) {
          const data = await response.json();
          setDocumentPrices(data);
        } else {
          console.error('Failed to fetch document prices:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching document prices:', error);
      }
    };

    fetchDocumentPrices();
  }, [id]);

  const handleCountryChange = (selectedOption) => {
    console.log('Selected Country on this Pjgjhgage:', selectedOption.label);
    setSelectedCountry(selectedOption);  // Update the selectedCountry state
  };  

  useEffect(() => {
    // Fetch all registered courier service providers
    const fetchCourierServiceProviders = async () => {
      try {
        const response = await fetch('https://dacs.onrender.com/api/v1/courier-service/');
        const data = await response.json();
        setCourierServiceProviders(data);
      } catch (error) {
        console.error('Error fetching courier service providers:', error);
      }
    };

    fetchCourierServiceProviders();
  }, []);






  useEffect(() => {
    // Log the full URL to the console for debugging
    console.log('Full URL:', window.location.href);
  }, []);

  //Construct the full decoded URL
  const fullDecodedURL = window.location.origin + window.location.pathname.replace(data, decodedData) + window.location.search;


 
  useEffect(() => {
    // Retrieve the selected institution index from local storage
    const selectedInstitutionIndex = localStorage.getItem('selectedInstitutionIndex');

    if (selectedInstitutionIndex !== null) {
      // Use the index to access the corresponding institution data
      const institutions = JSON.parse(localStorage.getItem('institutionData'));
      setSelectedInstitution(institutions[selectedInstitutionIndex]);
    }
  }, []);

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
  const [selectTranscriptType, setSelectTranscriptType] = useState('');

  const handleDeliveryMethodChange = (event) => {
    setSelectedDeliveryMethod(event.target.value);
  };
  
  const LocalStorageViewer = () => {
    // const userData = JSON.parse(localStorage.getItem('user'));



    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));

console.log("This is the token from local storage:", token);
console.log("This is the user data from local storage:", userData);

    
    // const token = localStorage.getItem('token');
    // const userData = JSON.parse(localStorage.getItem('user'));
    
    // console.log("This is the token from local storage:", token);
    // console.log("This is the user data from local storage:", userData);
    

    return (
      <div className="local-storage-viewer">
        <h2>Local Storage Data:</h2>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      </div>
    );
  };



  const [activeForm, setActiveForm] = useState(1);

 

  // Refs for capturing input values
  const facultyRef = useRef(null);
  const programTypeRef = useRef(null);
  const matricRef = useRef(null);
  const degreeRef = useRef(null);
  const departmentRef = useRef(null);
  const graduationYearRef = useRef(null);
  const deliveryMethodRef = useRef(null);
  const recipientEmailRef = useRef(null);
  const recipientAddressRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const deliveryTypeRef = useRef(null);
  const transcriptTypeRef = useRef(null);
  const addressRef = useRef(null);
  const countryRef = useRef(null);
  const preferCourierRef = useRef(null);
  const institutionName = useRef(null);



  //API SECTION

  const handleSubmit = async () => {
    event.preventDefault();
    
    // Prepare the data for the API request
    const requestData = {
      typeOfDocument: transcriptTypeRef.current?.value,
      degreeType: degreeRef.current.value,
      institutionId:  id,
      institutionName: decodedData, 
      institution: decodedData,
      faculty: facultyRef.current.value,
      department: departmentRef.current.value,
      matricNumber: matricRef.current.value,
      yearOfGraduation: graduationYearRef.current.value,
      program: programTypeRef.current.value,
      
    };
    
    // Save the request data to local storage
    localStorage.setItem('tempData', JSON.stringify(requestData));
    
    // Retrieve the token from local storage
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
    
    try {
      // Make the API request to create a transcript
      const response = await fetch('https://dacs.onrender.com/api/v1/transcript', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Use the retrieved token
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
    
      // Log the request data
      console.log('Request Data:', requestData);
    
      // Log the full API response
      const responseData = await response.json();
      console.log('API Response:', responseData);
    
      // Check if the API request was successful
      if (response.ok) {
        // Handle success, you may want to show a success message or navigate to another page
        console.log('Transcript created successfully');
        // Save the request data to local storage
    localStorage.setItem('transcriptApiResponse', JSON.stringify(responseData));
        // Now, you can change the active form
        setActiveForm(2);
      } else {
        // Handle error, you may want to show an error message
        console.error('Failed to create transcript');
      }
    } catch (error) {
      // Handle any network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };
  

  const transcriptApiResponse = JSON.parse(localStorage.getItem('transcriptApiResponse'));
  const transcriptId = transcriptApiResponse?.Transcript?._id;
  console.log('trans Id', transcriptId);
 

  // Access the selected country from the CountryDropdown component's state
  // const selectedCountryValue = selectedCountry?.value;


  const handlePatchRequest = async (selectTranscriptType, event) => {
    event.preventDefault();
    console.log('Current transcriptId:', transcriptId);
    if (!transcriptId) {
      console.error('transcriptId is not available');
      return;
    }
  
    const recipientCountry = selectedCountry ? selectedCountry.label : '';
  
    const requestDataa = {
      modeOfDelivery: selectedDeliveryMethod,
      recipientCountry: recipientCountry,
      recipientAddress: recipientAddressRef.current?.value,
      recipientPhoneNumber: phoneNumberRef.current?.value,
      recipientEmail: recipientEmailRef.current?.value,
      preferCourier: selectedCourier,
    };
  
    // Save the request data to local storage
    localStorage.setItem('tempDataD', JSON.stringify(requestDataa));
  
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  
    try {
      const response = await fetch(`https://dacs.onrender.com/api/v1/transcript/${transcriptId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestDataa),
      });
  
      console.log('Request Data:', requestDataa);
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Handle success or navigate to another page
        setActiveForm(3); // Move to activeForm == 3
      } else {
        console.error('Failed to update transcript delivery details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  









//   useEffect(() => {
//     fetch(`https://dacs.onrender.com/api/v1/transcript/payment-data/${transcriptId}`)
//         .then(response => response.json())
//         .then(data => setInvoiceData(data))
//         .catch(error => console.error('Error fetching data:', error));
// }, [transcriptId]);

// if (!invoiceData) {
//     return <p>Loading...</p>;
// }



// const fetchInvoiceData = () => {
//     if (transcriptId) {
//         fetch(`https://dacs.onrender.com/api/v1/transcript/payment-data/${transcriptId}`)
//             .then(response => response.json())
//             .then(data => {
//                 setInvoiceData(data);
//                 setActiveForm(5);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }
// };










  


  return (
    <div className='p-5'>
      <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
        <h4 className='font-bold'>{data}</h4>
        
        
        
       
        <button
          className='md:w-4/12 mx-auto bg-gray-300'
          onClick={() => {}}
          // style={{ color: 'black', marginLeft: '0' }}
        >
          Request Transcript From {data}
        </button>

        <h4 className='font-bold text-center'>Fill the Form below</h4>
        <p className='text-[14px] font-light text-center'>
          When applying for your transcript, please ensure that you carefully and accurately fill out the form below.
          Double-check all the information you provide, including your name, student ID number, course details, and the
          address where you want the transcript to be sent. Any errors or discrepancies may lead to delays in processing
          your request.
        </p>

        {/* <LocalStorageViewer/> */}

        <form className='flex flex-col'>
          {activeForm == 1 && (
            <div className='md:w-8/12 m-auto p-5'>
              {/* Conditionally render the forms based on screen size */}
              {window.innerWidth >= 768 ? (
                /* Large screen form */
                <div className='md:w-8/12 m-auto p-5 grid md:grid-cols-2 md:gap-x-[50px] gap-y-[25px]'>
                  <h4 className='col-span-2 text-center font-bold'>Bio-data</h4>
                  
                  <select
                    
                    onChange={(e) => setSelectTranscriptType(e.target.value)}
                    ref={transcriptTypeRef}
                    className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
                  >
                    <option value=''>Select Document {document.document}{document.amount}</option>
                    {documentPrices.map((document) => (
                      <option key={document.document} value={`${document.document}-${document.amount}`}>
                        {document.document} ({document.amount})
                      </option>
                    ))}
                  </select>

                  <input
                   type='text'
                   placeholder='Faculty'
                   ref={facultyRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Program Type'
                    ref={programTypeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Matric/Reg Number'
                    ref={matricRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Type Of Degree'
                    ref={degreeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Department'
                    ref={departmentRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    ref={graduationYearRef}
                    placeholder='Graduation year'
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </div>
              ) : (
                /* Small screen form */
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                  <h4 className='text-center font-bold mb-4'>Bio-data</h4>

                  <p style={{color: "gray" }}>Select Document Type</p>
                  <select
                    onChange={(e) => setSelectTranscriptType(e.target.value)}
                    ref={transcriptTypeRef}
                    className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
                  >
                    <option value=''>Select Document Type{document.document}{document.amount}</option>
                    {documentPrices.map((document) => (
                      <option key={document.document} value={`${document.document}-${document.amount}`}>
                        {document.document}({document.amount})
                      </option>
                    ))}
                  </select>

                  <input
                    type='text'
                    placeholder='Faculty'
                    ref={facultyRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Program Type'
                    ref={programTypeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Matric/Reg Number'
                    ref={matricRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Type Of Degree'
                    ref={degreeRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Department'
                    ref={departmentRef}
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    ref={graduationYearRef}
                    placeholder='Select Graduation year'
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                </div>
              )}
            </div>
          )}

        
           {activeForm == 2 && (
           <div className='md:w-8/12 m-auto grid md:grid-cols-2 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5'>
           {/* Conditionally render the delivery method form based on screen size */}
           {window.innerWidth >= 768 ? (
             /* Large screen form */
             <div className=' '>
             <h4 className='col-span-2 text-center font-bold'>Delivery Method</h4>



             <select
               onChange={handleDeliveryMethodChange}
               value={selectedDeliveryMethod}
               ref={deliveryTypeRef}
               className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
             >
               <option value='' disabled>Select mode of delivery</option>
               <option value='email'>Email</option>
               <option value='homeDelivery'>Courier</option>
               <option value='pickUp'>Pick up</option>
               {/* Add more options as needed */}
             </select>


             

             {selectedDeliveryMethod === 'homeDelivery' && (
               <>
                

                <CountryDropdown onCountryChange={handleCountryChange} />

            

                  <input
                   type='email'
                   placeholder='Recipient email'
                   ref={recipientEmailRef}
                   className='custom-textfield border-2 h-10 mt-5 border-black border-solid rounded-md p-2'
                 />
                 
                 {/* <input
                   type='text'
                   placeholder='Recipient address'
                   ref={recipientAddressRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 /> */}
                 <input
                   // type='number'
                   placeholder='Phone Number'
                   ref={phoneNumberRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 />

                <input
                   // type='number'
                   placeholder='Full Address'
                   ref={recipientAddressRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 />



<select
 className='custom-textfield border-2 border-black border-solid rounded-md p-2 h-10'
 value={selectedCourier}
 onChange={(e) => setSelectedCourier(e.target.value)}
>
 <option value='' disabled>Select Courier Service To Use</option>
 {courierServiceProviders.map((courier) => (
   <option
     key={courier._id}
     value={`${courier.businessName} - ${selectedCountry?.value === 'Nigeria' ? `₦ ${courier.localDeliveryPrice !== undefined ? courier.localDeliveryPrice : 'Unavailable'}` : `₦: ${courier.internationalDeliveryPrice !== undefined ? courier.internationalDeliveryPrice : 'Unavailable'}`}`}
     disabled={
       (selectedCountry?.value === 'Nigeria' && courier.localDeliveryPrice === undefined) ||
       (selectedCountry?.value !== 'Nigeria' && courier.internationalDeliveryPrice === undefined)
     }
     style={{ color: (selectedCountry?.value === 'Nigeria' && courier.localDeliveryPrice === undefined) || (selectedCountry?.value !== 'Nigeria' && courier.internationalDeliveryPrice === undefined) ? 'gray' : 'black' }}
   >
     {courier.businessName} {selectedCountry?.value === 'Nigeria' ? ` ${courier.localDeliveryPrice !== undefined ? courier.localDeliveryPrice : 'Unavailable'}` : `₦: ${courier.internationalDeliveryPrice !== undefined ? courier.internationalDeliveryPrice : 'Unavailable'}`}
   </option>
 ))}
</select>






   
               </>
             )}

             {selectedDeliveryMethod === 'email' && (
               <>
                 <input
                   type='email'
                   placeholder='Recipient email'
                   ref={recipientEmailRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 />
               </>
             )}

             {selectedDeliveryMethod === 'pickUp' && (
               <>
                 <input
                   type='email'
                   placeholder='Recipient email'
                   ref={recipientEmailRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 />
                 <input
                   type='number'
                   placeholder='Phone Number'
                   ref={phoneNumberRef}
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                 />
               </>
             )}
           </div>
           ) : (
             /* Small screen form */
             <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
               <h4 className='text-center font-bold mb-4'>Delivery Method</h4>
               <select
                 onChange={handleDeliveryMethodChange}
                 value={selectedDeliveryMethod}
                 ref={deliveryTypeRef}
                 className='custom-dropdown border-2 border-black border-solid rounded-md p-2'
               >
                 <option value='' disabled>Select mode of delivery</option>
                 <option value='email'>Email</option>
                 <option value='homeDelivery'>Courier</option>
                 <option value='pickUp'>Pick up</option>
                 {/* Add more options as needed */}
               </select>
               {selectedDeliveryMethod === 'homeDelivery' && (
                 <>
                   <CountryDropdown onCountryChange={handleCountryChange} />
                   <input
                     type='email'
                     placeholder='Recipient email'
                     ref={recipientEmailRef}
                     className='custom-textfield border-2 h-10 mt-5 border-black border-solid rounded-md p-2'
                   />
                   <input
                     // type='number'
                     placeholder='Phone Number'
                     ref={phoneNumberRef}
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                   />
                   <input
                     // type='number'
                     placeholder='Full Address'
                     ref={recipientAddressRef}
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                   />
                   <select
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2 h-10'
                     value={selectedCourier}
                     onChange={(e) => setSelectedCourier(e.target.value)}
                   >
                     <option value='' disabled>Select Courier Service To Use</option>
                     {courierServiceProviders.map((courier) => (
                       <option
                         key={courier._id}
                         value={`${courier.businessName} - ${selectedCountry?.value === 'Nigeria' ? `₦ ${courier.localDeliveryPrice !== undefined ? courier.localDeliveryPrice : 'Unavailable'}` : `₦: ${courier.internationalDeliveryPrice !== undefined ? courier.internationalDeliveryPrice : 'Unavailable'}`}`}
                         disabled={
                           (selectedCountry?.value === 'Nigeria' && courier.localDeliveryPrice === undefined) ||
                           (selectedCountry?.value !== 'Nigeria' && courier.internationalDeliveryPrice === undefined)
                         }
                         style={{ color: (selectedCountry?.value === 'Nigeria' && courier.localDeliveryPrice === undefined) || (selectedCountry?.value !== 'Nigeria' && courier.internationalDeliveryPrice === undefined) ? 'gray' : 'black' }}
                       >
                         {courier.businessName} {selectedCountry?.value === 'Nigeria' ? ` ${courier.localDeliveryPrice !== undefined ? courier.localDeliveryPrice : 'Unavailable'}` : `₦: ${courier.internationalDeliveryPrice !== undefined ? courier.internationalDeliveryPrice : 'Unavailable'}`}
                       </option>
                     ))}
                   </select>
                 </>
               )}
         
               {selectedDeliveryMethod === 'email' && (
                 <>
                   <input
                     type='email'
                     placeholder='Recipient email'
                     ref={recipientEmailRef}
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                   />
                 </>
               )}
         
               {selectedDeliveryMethod === 'pickUp' && (
                 <>
                   <input
                     type='email'
                     placeholder='Recipient email'
                     ref={recipientEmailRef}
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                   />
                   <input
                     type='number'
                     placeholder='Phone Number'
                     ref={phoneNumberRef}
                     className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                   />
                 </>
               )}
             </div>
           )}
         </div>
         
          )}


        {activeForm === 3 && (
              <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography variant="h4" align="center">
                  Summary of Inputs
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="body1">Faculty: {faculty}</Typography>
                  <Typography variant="body1">Program Type: {program}</Typography>
                  <Typography variant="body1">Matric/Reg Number: {matricNumber}</Typography>
                  <Typography variant="body1">Type Of Degree: {degreeType}</Typography>
                  <Typography variant="body1">Department: {department}</Typography>
                  <Typography variant="body1">Graduation Year: {yearOfGraduation}</Typography>
                  <Typography variant="body1">Type of Document: {typeOfDocument}</Typography>
                  <Typography variant="body1">Mode of Delivery: {modeOfDelivery}</Typography>
                  {modeOfDelivery === 'homeDelivery' && (
                    <>
                      <Typography variant="body1">Recipient Country: {recipientCountry}</Typography>
                      <Typography variant="body1">Recipient Email: {userEmail}</Typography>
                      <Typography variant="body1">Recipient Phone Number: {recipientPhoneNumber}</Typography>
                      <Typography variant="body1">Recipient Address: {recipientAddress}</Typography>
                      <Typography variant="body1">Courier Service: {preferCourier}</Typography>
                    </>
                  )}
                  {modeOfDelivery === 'email' && <Typography variant="body1">Recipient Email: {userEmail}</Typography>}
                  {modeOfDelivery === 'pickUp' && (
                    <>
                      <Typography variant="body1">Recipient Email: {userEmail}</Typography>
                      <Typography variant="body1">Recipient Phone Number: {recipientPhoneNumber}</Typography>
                    </>
                  )}
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">School charge: {schoolCharge}</Typography>
                <Typography variant="body1">Delivery charge: {deliveryCharge}</Typography>
                <Typography variant="body1">Portal system processing fee: {processingFee}</Typography>
                <Typography variant="body1">Total: {total}</Typography>
                <Button variant="contained" style={{backgroundColor:"blue"}} onClick={payWithPaystack}>Pay Now</Button>
              </Grid>
              </Grid>
              )}`
              
              
              
              
              
          {activeForm == 4 && (
              <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">Payment Successful</h1>
              <p className="text-lg text-gray-600 mb-6">Your payment has been processed successfully.</p>
              {/* <button type='button' onClick={fetchInvoiceData} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  View Receipt
              </button> */}
              <button
              type='button'
              onClick={() => window.open(`/receipt`, '_blank', 'width=600,height=400')}
            >
              View Receipt
            </button>
          </div>
          )}









          {activeForm == 5 && (
             <div className="container mx-auto">
             <div className="bg-white border rounded-lg shadow-lg px-8 py-6 my-8">
                 <div className="flex justify-between items-center">
                     <div>
                         <h2 className="text-xl font-bold text-gray-800">Invoice #{invoiceData.reference}</h2>
                         <p className="text-sm text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
                     </div>
                     <div>
                         <img src="https://via.placeholder.com/150" alt="Company Logo" className="w-24" />
                     </div>
                 </div>
                 <div className="mt-6">
                     <h3 className="text-lg font-bold text-gray-800">Customer Information</h3>
                     <div className="flex justify-between">
                         <div>
                             <p className="text-sm text-gray-600"><span className="font-bold">Name:</span> {invoiceData.alumniName}</p>
                             <p className="text-sm text-gray-600"><span className="font-bold">Email:</span> {invoiceData.customerEmail}</p>
                             <p className="text-sm text-gray-600"><span className="font-bold">Phone:</span> {invoiceData.customerPhone}</p>
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
                     {/* <Button variant="contained" color="primary" onClick={handleDownloadClick}>
          Download Invoice
        </Button> */}
                 </div>
             </div>
         </div>
          )}

          {/* Buttons */}
          {activeForm == 1 && (

            <div>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              // setActiveForm(2); // Navigate to the next step
              handleSubmit(); // Call handleSubmit
            }}>
              Continue
            </button>

            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(4); // Navigate to the next step
              // handleSubmit(); // Call handleSubmit
            }}>
              next
            </button>
            </div>
          )}

          {activeForm == 2 && (
            <div className='grid grid-cols-2 '>
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(1); // Navigate to the previous step
                // handleSubmit(); // Call handleSubmit
              }}>
                Start All Over
              </button>

              <button
                className='md:w-4/12 mx-auto bg-purple-700 border-2 rounded-md p-2'
                onClick={() => {
                  handlePatchRequest(selectTranscriptType, event);
                }}
              >
                Add Delivery Details
              </button>

              {/* <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(3); // Navigate to the previous step
                // handleSubmit(); // Call handleSubmit
              }}>
                Nexxxxx
              </button>
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(3); // Navigate to the previous step
                // handleSubmit(); // Call handleSubmit
              }}>
                Nexxxxx
              </button> */}
            </div>
          )}

          {activeForm == 3 && (
            <div>
              {/* Added Link To the Table Items To Open The Request Track And Delivery Page */}
              {/* <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2 lowercase uppercase '>
                Proceed
              </button>
              
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(4); // Navigate to the previous step
                // handleSubmit(); // Call handleSubmit
              }}>
                Nexxxxx
              </button> */}
            </div>
          )}

        {activeForm == 4 && (
            <div>
              {/* Added Link To the Table Items To Open The Request Track And Delivery Page */}
              {/* <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2 lowercase uppercase '>
                Proceed
              </button> */}
              
              {/* <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(3); // Navigate to the previous step
                // handleSubmit(); // Call handleSubmit
              }}>
                Prev
              </button> */}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AlumniDetailsForm;
