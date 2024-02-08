import React, { useState } from 'react';
import { StaffListTable } from '../../../components';
import { Logs, RecentRequests, StaffList, StudentList, TranscriptData } from '../../../containers';
import StaffListA from '../../../containers/Admin/StaffListA';
import ResultsTable from '../../../containers/Admin/ResultsTable';
import TranscriptGridAdmin from '../../../components/transcriptGridItem/TranscriptGridItemAdmin';
function InstitutionTables(props) {


  
    const [activeButton, setActiveButton] = useState('student');

    const handleButtonClick = (button) => {
      setActiveButton(button);
    };
  

  return (
    <div>
    {/* Top section */}
    <div className="flex items-start justify-between gap-5 mt-3.5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
  <div className="text-zinc-800 text-lg font-semibold px-6 py-4">All Schools</div>
  {['student', 'staff', 'logs', 'Results', 'Transcript', 'Transactions'].map((button) => (
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
      {activeButton === 'staff' && <StaffListA />}
      {activeButton === 'student' && <StudentList />}
      {activeButton === 'logs' && <Logs />}
      {activeButton === 'Results' && <ResultsTable />} 
      {activeButton === 'Transcript' && <RecentRequests />} 

      {/* Add more conditions for other categories if needed */}
    </div>
  </div>
  );
}

export default InstitutionTables;