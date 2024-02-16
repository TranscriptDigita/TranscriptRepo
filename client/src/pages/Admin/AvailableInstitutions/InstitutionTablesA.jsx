import React, { useState } from 'react';
import { StaffListTable } from '../../../components';
import { Logs, StaffList, StaffListI, StudentList, TransactionsB } from '../../../containers';
import StaffListA from '../../../containers/Admin/StaffListA';
import { useParams } from 'react-router-dom';
function InstitutionTablesA(props) {


  
    const [activeButton, setActiveButton] = useState('staff');
    const { data } = useParams(); 

    const handleButtonClick = (button) => {
      setActiveButton(button);
    };
  

  return (
    <div>
    {/* Top section */}
    <div className="flex items-start justify-between gap-5 mt-3.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
      <div className="flex flex-row space-x-4">
        <div className="text-zinc-800 text-lg font-semibold px-6 py-4">{data}</div>
        {['staff', 'transactions'].map((button) => (
          <button
            key={button}
            className={`text-sm font-semibold whitespace-nowrap px-6 py-4 rounded-md ${
              activeButton === button
                ? 'text-purple-800 bg-purple-800 bg-opacity-10'
                : 'text-zinc-800'
            }`}
            onClick={() => handleButtonClick(button)}
          >
            {button === 'logs' ? 'Logs' : button.charAt(0).toUpperCase() + button.slice(1)}
          </button>
        ))}
      </div>
    </div>

    {/* Input fields section */}
    <div className="flex gap-3 mt-3.5">
      {/* ... (Existing input fields) */}
    </div>

    <div className="mt-10">
      {activeButton === 'staff' && <StaffListI />}
      {activeButton === 'transactions' && <TransactionsB />}
      
      
      {/* Add more conditions for other categories if needed */}
    </div>
  </div>
  );
}

export default InstitutionTablesA;