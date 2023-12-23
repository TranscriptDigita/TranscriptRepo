import React, { useState, useEffect } from 'react';
import StaffListTable from '../../components/table/StaffListTable';
import { StaffListTableA } from '../../components';

function StudentList() {
  const headers = [
    {
      title: 'Name',
    },
    {
      title: 'Email',
    },
    {
      title: 'Status',
    },
  
   
  ];

  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  const getBearerToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      const token = userDataObject?.admin?.token || '';
      console.log('Bearer Token:', token); // Log the token
      return token;
    }
    console.log('Bearer Token not found');
    return '';
  };


  // Function to extract institution ID from stored data
  const getAdminId = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.admin?._id;
      
    }
    return null;
};


const getAdminToken = () => {
  const storedUserData = localStorage.getItem('AdminUser');
  if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    
  }
  return null;
};



   const adminId = getAdminId();

   // Log the value of institutionId
   console.log('Admin IDDD:', adminId);



  //  const adminToken = getAdminToken();

  //  // Log the value of institutionId
  //  console.log('Admin TokenDDD:', adminToken);
    


  

const apiEndpoint = 'https://dacs.onrender.com/api/v1/admin/all/alumnus';
const bearerToken = getAdminToken();
console.log("table token: ", bearerToken);


// ...

useEffect(() => {
  // Fetch staff data from the API
  fetch(apiEndpoint, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearerToken}`, // Include the Bearer token in the header
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch staff data');
      }
    })
    .then((data) => {
      setAlumniData(data);
      setIsLoading(false);
      console.log('Success: Data fetched from the API', data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    });
}, []); // The empty dependency array ensures the effect runs once on component mount








return (
  <div>
    {/* ... (existing code) */}
    <StaffListTableA
      headers={headers}
      items={alumniData.map((alumni) => ({
        Name: alumni.fullName,
        Email: alumni.emailAddress,
        'Status': alumni.isActive ? 'Active' : 'Inactive',
      }))}
    />
  </div>
  
);
}


export default StudentList;
