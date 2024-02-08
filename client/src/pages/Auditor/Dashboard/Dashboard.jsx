import React, { useState } from 'react';
import { Transactions, NewRequestA } from '../../../containers';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('transactions');

  const handleButtonClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div>
      {/* Buttons to toggle between sections */}
      <div className="flex gap-3 mt-3.5">
        <button
          className={`text-sm font-semibold whitespace-nowrap px-6 py-4 rounded-md ${
            activeSection === 'transactions'
              ? 'text-purple-800 bg-purple-800 bg-opacity-10'
              : 'text-zinc-800'
          }`}
          onClick={() => handleButtonClick('transactions')}
        >
          Transactions
        </button>
        <button
          className={`text-sm font-semibold whitespace-nowrap px-6 py-4 rounded-md ${
            activeSection === 'requests'
              ? 'text-purple-800 bg-purple-800 bg-opacity-10'
              : 'text-zinc-800'
          }`}
          onClick={() => handleButtonClick('requests')}
        >
          Requests
        </button>
      </div>

      {/* Display the selected section */}
      <div className="mt-10">
        {activeSection === 'transactions' && <Transactions />}
        {activeSection === 'requests' && <NewRequestA />}
      </div>
    </div>
  );
}

export default Dashboard;
