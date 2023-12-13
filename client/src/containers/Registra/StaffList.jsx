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
  

const apiEndpoint = 'https://dacs.onrender.com/api/v1/staff';
const bearerToken = getBearerToken();
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
      setStaffData(data);
      setIsLoading(false);
      console.log('Success: Data fetched from the API', data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    });
}, []); // The empty dependency array ensures the effect runs once on component mount







const deactivateStaff = (staffId) => {
  // Replace 'yourBearerToken' with your actual Bearer token
  // const bearerToken = 'yourBearerToken';

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




const activateStaff = (staffId) => {
  fetch(`https://dacs.onrender.com/api/v1/staff/activate/${staffId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
    body: JSON.stringify({ isActive: true }),
  })
    .then((response) => {
      if (response.ok) {
        const updatedStaffData = staffData.map((staff) => {
          if (staff._id === staffId) {
            return { ...staff, isActive: true };
          }
          return staff;
        });
        setStaffData(updatedStaffData);
        console.log('Success: Staff activated');
      } else {
        console.error('Error activating staff:', response.status, response.statusText);
      }
    })
    .catch((error) => {
      console.error('Error activating staff:', error);
    });
};




return (
  <div>
    {/* ... (existing code) */}
    <StaffListTable
      headers={headers}
      items={staffData.map((staff) => ({
        Email: staff.emailAddress,
        Role: staff.role,
        'Account Status': staff.isActive ? 'Active' : 'Inactive',
        Deactivate: (
          <ToggleButton
            key={staff._id}
            isActive={staff.isActive}
            staffId={staff._id}
            deactivateStaff={deactivateStaff}
            activateStaff={activateStaff}
          />
        ),
      }))}
    />
  </div>
);
}

function ToggleButton({ isActive, staffId, deactivateStaff, activateStaff }) {
  const handleClick = () => {
    if (isActive) {
      // If staff is active, deactivate
      deactivateStaff(staffId);
    } else {
      // If staff is inactive, activate
      activateStaff(staffId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`py-2 px-4 rounded ${isActive ? 'bg-red-500' : 'bg-green-500'} text-white`}
    >
      {isActive ? 'Deactivate' : 'Activate'}
    </button>
  );
}


export default StaffList;
