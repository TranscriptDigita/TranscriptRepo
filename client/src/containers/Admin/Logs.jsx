import React, { useState, useEffect } from 'react';

function Logs() {
  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const getAdminId = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.admin?._id;
    }
    return null;
  };

  const adminId = getAdminId();
  console.log('Admin IDL:', adminId);

  const bearerToken = getAdminToken();
  console.log('table tokenL: ', bearerToken);

  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState('All');

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch('https://dacs.onrender.com/api/v1/admin/all/logs', {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        });
        const data = await response.json();
        setLogs(data);
        filterLogsByDate(data, selectedDate);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    fetchLogs();
  }, [selectedDate]);

  const filterLogsByDate = (logsData, date) => {
    if (date === 'All') {
      setFilteredLogs(logsData);
    } else {
      const filtered = logsData.filter((log) => {
        const logDateTime = new Date(log.logTime).toISOString().split('T')[0];
        return logDateTime === date;
      });
      console.log('Filtered Logs:', filtered); // Add this line to log the filtered logs
      setFilteredLogs(filtered);
    }
  };

  

  const uniqueDates = [...new Set(logs.map((log) => log.logTime.split('T')[0]))];

  const renderLogs = () => {
    if (filteredLogs.length === 0) {
      return <div>No logs for the selected date.</div>;
    }
    return filteredLogs.map((log) => (
      <div key={log._id} className="bg-opacity-10 flex flex-col pl-4 pr-20 py-11 rounded-md items-start max-md:pr-5">
          <div className="items-center flex gap-3">
          <div className="text-black text-base font-semibold grow whitespace-nowrap my-auto">
            Date: <span className="">{log.logTime}</span>
          </div>
          
        </div>
        <div className="items-stretch  gap-1 mt-1.5">
          <div className="text-black text-sm font-semibold grow whitespace-nowrap">
            Log Type: {log.logType}
          </div>
          <div className="text-black text-sm grow whitespace-nowrap">Log Time: {log.logTime}</div>
        </div>
        <div className="items-stretch flex gap-1 mt-2">
          <div className="text-black text-sm font-semibold grow whitespace-nowrap">
            {/* Add more log information display as needed */}
          </div>
        </div>
      </div>
    ));
  };




  return (
    <div>
      {/* Dropdown to filter logs by date */}
      <div className="mb-4">
        <label htmlFor="dateFilter" className="text-black text-sm font-semibold mr-2">
          Filter by Date:
        </label>
        <select
          id="dateFilter"
          value={selectedDate}
          onChange={handleDateChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All</option>
          {uniqueDates.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </select>
      </div>

      {/* Render filtered logs */}
      {renderLogs()}
    </div>
  );
}


export default Logs;