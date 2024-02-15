import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UniversityProfile() {
  const [activeForm, setActiveForm] = useState(1);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };



  const getBearerToken = () => {
    const storedUserData = localStorage.getItem('institutionUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      const token = userDataObject?.token || '';
      console.log('Bearer Token:', token); // Log the token
      return token;
    }
    console.log('Bearer Token not found');
    return '';
  };


  
  const bearerToken = getBearerToken();
  console.log(bearerToken);
  

 // Function to handle file upload and API call
 // Function to handle file upload and API call
 const handleFileUpload = async () => {
  event.preventDefault();

  if (selectedFile) {
    try {

      // Log the name of the file
      console.log('File Name:', selectedFile);
      // Create a new FormData object to construct the multipart/form-data request
      const formData = new FormData();
      formData.append('uploadfile', selectedFile);

      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
      const apiEndpoint = 'https://dacs.onrender.com/api/v1/students-data/';

      // Use the fetch function to make a POST request to the API endpoint
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`, // Include Bearer Token in the Authorization header
        },
        body: formData, // Include the FormData object containing the file in the request body
      });

      // Log the API response
      console.log('API Response:', response);

      // Check if the response status is ok (2xx status code)
      if (response.ok) {
        console.log('File uploaded successfully!');
        toast.success('File uploaded successfully!');
        // Add further logic as needed (e.g., display success message, navigate to another page)
      } else {
        console.error('File upload failed:', response.statusText);
        toast.error('File upload Failed');
        // Handle error, display error message, etc.
      }
    } catch (error) {
      console.error('An error occurred during file upload:', error);
      // Handle unexpected errors
    }
  } else {
    console.error('No file selected');
  }
};


  return (
    <div>
      
      <div className='flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg'>
        <form className='flex flex-col'>
          {activeForm == 1 && (
            <div className='md:w-8/12 m-auto p-5'>
              {/* Conditionally render the forms based on screen size */}
              {window.innerWidth >= 768 ? (
                /* Large screen form */
                <div className='md:w-8/12 m-auto p-5 grid md:grid-cols-1 md:gap-x-[50px] gap-y-[25px]'>
                  <h4 className='col-span-1 text-center font-bold'>University Profile</h4>
                  <input
                   type='text'
                   placeholder='University Name'
                 
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Country'
                    
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='State'
                 
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Password'
                  
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                 
                </div>
              ) : (
                /* Small screen form */
                <div className='md:w-8/12 m-auto p-5 flex flex-col items-center'>
                  <h4 className='text-center font-bold mb-4'>Bio-data</h4>
                  <input
                   type='text'
                   placeholder='University Name'
                 
                   className='custom-textfield border-2 border-black border-solid rounded-md p-2'
                  />
                  <input
                    type='text'
                    placeholder='Country'
                    
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-10'
                  />
                  <input
                    type='text'
                    placeholder='State'
                 
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-10'
                  />
                  <input
                    type='text'
                    placeholder='Password'
                  
                    className='custom-textfield border-2 border-black border-solid rounded-md p-2 mt-10'
                  />
                </div>
              )}
            </div>
          )}

          {activeForm == 2 && (
            <div className='md:w-8/12 m-auto p-5'>
              {window.innerWidth >= 768 ? (
                <div className='grid md:grid-cols-1 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5'>
                      <p className='text-[14px] font-light '>
                      Welcome, University Administrators! To facilitate a smooth transcript retrieval process for your students, 
                      please follow the prompt below to upload the necessary data:
                    </p>
                    
                    <h4 className='font-bold '>Step 1: Prepare The Excel File</h4>
                    <p className='text-[14px] font-light '>
                    Create an Excel file with the following columns:</p>
                    <p className='text-[14px] font-light '>Registration Number (Reg Number): Each student's unique registration number.</p>
                    <p className='text-[14px] font-light '>Year Graduated: The year in which the student graduated.</p>
                    <p className='text-[14px] font-light '>Additional Columns (Optional): Any additional data you would like to include for improved accuracy</p>
                    

                    <h4 className='font-bold '>Step 2: Group Data By Reg Number And Year Graduated</h4>
                    <p className='text-[14px] font-light '>Ensure that the data in the Excel file is grouped according to the registration number and year graduated.</p>
                    <p className='text-[14px] font-light '>This grouping will enable seamless identification and retrieval of transcripts for eligible students.</p>

                    <h4 className='font-bold '>Step 3: Upload the Excel File </h4>
                    <p className='text-[14px] font-light '>Click on the "Upload" button below to securely upload the Excel file.</p>
                    <p className='text-[14px] font-light '>Our system will process the data and integrate it into our transcript retrieval platform.</p>


                    <h4 className='font-bold '>Please note:</h4>
                    <p className='text-[14px] font-light '>Make sure the Excel file adheres to the specified format.</p>
                    <p className='text-[14px] font-light '>We prioritize the privacy and security of student data. Rest assured that the information provided will be treated with the utmost confidentiality and stored securely.</p>

                    <p className='text-[14px] font-light '>Thank you for partnering with us to streamline the transcript retrieval process. Your cooperation is greatly appreciated, and we are committed to delivering a seamless experience for both universities and students alike.</p>
                    <p className='text-[14px] font-light '>If you have any questions or need assistance, please reach out to our dedicated support team at [Contact Email/Phone]. We're here to help!</p>
                </div>
              ) : (
                <div className='grid md:grid-cols-1 grid-cols-1 md:gap-x-[50px] gap-y-[25px] p-5'>
                      <p className='text-[14px] font-light '>
                      Welcome, University Administrators! To facilitate a smooth transcript retrieval process for your students, 
                      please follow the prompt below to upload the necessary data:
                    </p>
                    
                    <h4 className='font-bold '>Step 1: Prepare The Excel File</h4>
                    <p className='text-[14px] font-light '>
                    Create an Excel file with the following columns:</p>
                    <p className='text-[14px] font-light '>Registration Number (Reg Number): Each student's unique registration number.</p>
                    <p className='text-[14px] font-light '>Year Graduated: The year in which the student graduated.</p>
                    <p className='text-[14px] font-light '>Additional Columns (Optional): Any additional data you would like to include for improved accuracy</p>
                    

                    <h4 className='font-bold '>Step 2: Group Data By Reg Number And Year Graduated</h4>
                    <p className='text-[14px] font-light '>Ensure that the data in the Excel file is grouped according to the registration number and year graduated.</p>
                    <p className='text-[14px] font-light '>This grouping will enable seamless identification and retrieval of transcripts for eligible students.</p>

                    <h4 className='font-bold '>Step 3: Upload the Excel File </h4>
                    <p className='text-[14px] font-light '>Click on the "Upload" button below to securely upload the Excel file.</p>
                    <p className='text-[14px] font-light '>Our system will process the data and integrate it into our transcript retrieval platform.</p>


                    <h4 className='font-bold '>Please note:</h4>
                    <p className='text-[14px] font-light '>Make sure the Excel file adheres to the specified format.</p>
                    <p className='text-[14px] font-light '>We prioritize the privacy and security of student data. Rest assured that the information provided will be treated with the utmost confidentiality and stored securely.</p>

                    <p className='text-[14px] font-light '>Thank you for partnering with us to streamline the transcript retrieval process. Your cooperation is greatly appreciated, and we are committed to delivering a seamless experience for both universities and students alike.</p>
                    <p className='text-[14px] font-light '>If you have any questions or need assistance, please reach out to our dedicated support team at [Contact Email/Phone]. We're here to help!</p>
                </div>
              
              )}
            </div>
          )}

          {/* {activeForm == 3 && (
            <div className='grid grid-cols md:w-8/12 m-auto md:gap-x-[50px] gap-y-[25px]'>
              <h4 className='text-center'>Select payment method</h4>
              <div className='flex justify-center'>
                <img className='cursor-pointer' src={remitaImg} alt='remita' />
              </div>
            </div>
          )} */}

          {/* Buttons */}
          {activeForm == 1 && (
            <div className='md:w-8/12 m-auto p-5 grid md:grid-cols-1 md:gap-x-[50px] gap-y-[25px]'>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
             
            }}>
              Continue
            </button>
            <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
            onClick={() => {
              setActiveForm(2); // Navigate to the next step
             
            }}>
              Skip to Add Result
            </button>
            </div>
            
          )}

          {activeForm == 2 && (
            <div className='grid grid-cols-2 '>





{/* 
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
               onClick={() => {
                setActiveForm(1); // Navigate to the previous step
               
              }}>
                Previous
              </button> */}
                
                   
                    <label
                      className={`md:w-4/12 mx-auto bg-${selectedFile ? 'green' : 'gray-300'} 
                        border-2 rounded-md p-2 cursor-pointer`}
                    >
                      Upload Student's Data
                      <input
                        id='fileInput'
                        type='file'
                        ref={fileInputRef}
                        className='hidden'
                        onChange={handleFileChange}
                      />
                    </label>


                    <button
                className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2'
                onClick={handleFileUpload}
              >
                Submit
              </button>

                 

                  {/* Display the name of the uploaded file */}
                  {selectedFile && (
                    <p className='text-[14px] font-light mt-2'>
                      Uploaded File: {selectedFile.name}
                    </p>
                  )}
                </div>
            
          )}

          {activeForm == 3 && (
            <Link to={`/alumni/:id/requesttrackanddelivery`}>
              {/* Added Link To the Table Items To Open The Request Track And Delivery Page */}
              <button className='md:w-4/12 mx-auto bg-purple-700  border-2 rounded-md p-2 lowercase uppercase '>
                Proceed
              </button>
            </Link>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UniversityProfile;
