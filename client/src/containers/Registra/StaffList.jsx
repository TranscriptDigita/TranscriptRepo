import React, { useState, useEffect } from 'react';
import StaffListTable from '../../components/table/StaffListTable';

function StaffList() {
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
    {
      title: 'Deactivate',
    },
  ];

  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

const apiEndpoint = 'https://dacs.onrender.com/api/v1/staff';
const bearerToken = 'yourBearerToken'; // Replace with your actual Bearer token

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
      setStaffData(data);
      setIsLoading(false);
      console.log('Success: Data fetched from the API');
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    });
}, []); // The empty dependency array ensures the effect runs once on component mount





const deactivateStaff = (staffId) => {
  // Replace 'yourBearerToken' with your actual Bearer token
  const bearerToken = 'yourBearerToken';

  // Send a PATCH request to deactivate a staff member
  fetch(`https://dacs.onrender.com/api/v1/staff/${staffId}`, {
    method: 'PATCH', // Use PATCH or PUT depending on your API's design
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`, // Include the Bearer token in the header
    },
    body: JSON.stringify({ isActive: false }),
  })
    .then((response) => {
      if (response.ok) {
        // Update the staffData state with the updated data (e.g., set isActive to false)
        const updatedStaffData = staffData.map((staff) => {
          if (staff._id === staffId) {
            return { ...staff, isActive: false };
          }
          return staff;
        });
        setStaffData(updatedStaffData);
        console.log('Success: Staff deactivated');
      } else {
        console.error('Error deactivating staff:', response.status, response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error deactivating staff:', error);
    });
};


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StaffListTable
          headers={headers}
          items={staffData.map((staff) => ({
            Email: staff.emailAddress,
            Role: staff.role,
            'Account Status': staff.isActive ? 'Active' : 'Inactive',
            Deactivate: (
              <ToggleButton
                isActive={staff.isActive}
                staffId={staff._id}
                deactivateStaff={deactivateStaff}
              />
            ),
          }))}
        />
      )}
    </div>
  );
}

function ToggleButton({ isActive, staffId, deactivateStaff }) {
  const handleDeactivate = () => {
    // Call the deactivateStaff function to deactivate the staff member
    deactivateStaff(staffId);
  };

  return (
    <button
      onClick={handleDeactivate}
      className={`py-2 px-4 rounded ${isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      Deactivate
    </button>
  );
}

export default StaffList;
