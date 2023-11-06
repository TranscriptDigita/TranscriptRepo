import React, { useState } from 'react';
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

  // Manually create sample data for each field, including a separate state for each button
  const formattedItems = [
    {
      'Email': 'john.doe@example.com',
      'Role': 'Admin',
      'Account Status': 'Active',
      'Deactivate': (
        <ToggleButton />
      ),
    },
    {
      'Email': 'jane.smith@example.com',
      'Role': 'User',
      'Account Status': 'Inactive',
      'Deactivate': (
        <ToggleButton />
      ),
    },
    // Add more items as needed
  ];

  // ToggleButton component that manages its own state
  function ToggleButton() {
    const [isActive, setIsActive] = useState(false);

    const handleToggle = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setIsActive(!isActive);
      };

    return (
      <button
        onClick={handleToggle}
        className={`py-2 px-4 rounded ${
          isActive ? 'bg-green-500' : 'bg-red-500'
        } text-white`}
      >
        {isActive ? 'Activated' : 'Deactivated'}
      </button>
    );
  }

  return (
    <div>
      <StaffListTable headers={headers} items={formattedItems} />
    </div>
  );
}

export default StaffList;
