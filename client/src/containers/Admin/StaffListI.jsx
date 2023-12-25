import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { StaffListTableA } from '../../components';

function StaffListI() {
  const { id } = useParams(); // Get the id parameter from the URL

  const headers = [
    {
      title: 'Email',
    },
    {
      title: 'Role',
    },
    {
      title: 'Account Status',
    },
  ];

  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const apiEndpoint = `https://dacs.onrender.com/api/v1/admin/${id}/staff/list`; // Include the id in the URL
  const bearerToken = getAdminToken();

  useEffect(() => {
    // Fetch staff data from the API
    fetch(apiEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`, // Include the Bearer token in the header
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
        setStaffData(data);
        setIsLoading(false);
        console.log('Success: Data fetched from the API', data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [apiEndpoint, bearerToken]); // Include dependencies in the dependency array

  return (
    <div>
      {/* ... (existing code) */}
      <StaffListTableA
        headers={headers}
        items={staffData.map((staff) => ({
          Email: staff.emailAddress,
          Role: staff.role,
          'Account Status': staff.isActive ? 'Active' : 'Inactive',
        }))}
      />
    </div>
  );
}

export default StaffListI;
