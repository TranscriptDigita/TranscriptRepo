// AdminTable.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StaffListTableA from '../../components/table/StaffListTableA';

const AdminTable = () => {
  const [adminData, setAdminData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token: urlToken, id: adminIdFromUrl } = useParams();
  const bearerToken = urlToken || '';

  const headers = [
    { title: 'Email' },
    { title: 'Status' },
    { title: 'Action' },
  ];

  useEffect(() => {
    if (!adminIdFromUrl) {
      console.error('Admin ID not found in the URL');
      setIsLoading(false);
      return;
    }

    const adminEndpoint = `https://dacs.onrender.com/api/v1/admin/`;

    fetch(adminEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch admin data');
        }
      })
      .then((adminList) => {
        setAdminData(adminList);
        setIsLoading(false);
        console.log('Success: Admin data fetched from the API', adminList);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
        setIsLoading(false);
      });
  }, [bearerToken, adminIdFromUrl]);

  const handleDelete = (adminId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this admin?');

    if (!isConfirmed) {
      return;
    }

    const deleteEndpoint = `https://dacs.onrender.com/api/v1/admin/${adminId}`;

    fetch(deleteEndpoint, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Update the state to reflect the deletion
          setAdminData((prevData) => prevData.filter((admin) => admin._id !== adminId));
          console.log('Success: Admin deleted from the API');
        } else {
          throw new Error('Failed to delete admin');
        }
      })
      .catch((error) => {
        console.error('Error deleting admin:', error);
      });
  };

  return (
    <div>
      <h2>Admin Users</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StaffListTableA
          headers={headers}
          items={adminData.map((admin) => ({
            Email: admin.emailAddress,
            'Status': admin.isActive ? 'Active' : 'Inactive',
            'Action': (
              <button
                onClick={() => handleDelete(admin._id)}
                style={{ color: 'red' }}
              >
                Delete
              </button>
            ),
          }))}
        />
      )}
    </div>
  );
};

export default AdminTable;
