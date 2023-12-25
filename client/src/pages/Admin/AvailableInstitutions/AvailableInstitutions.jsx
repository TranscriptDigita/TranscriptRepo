import React, { useState, useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Table, TableA, TranscriptGridItemAdmin } from '../../../components';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

function AvailableInstitutions() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://dacs.onrender.com/api/v1/institution/');
        const data = await response.json();
        setInstitutions(data);
        console.log("this is data", data);
         // Store data in local storage
         localStorage.setItem('institutionData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="flex flex-1 flex-col bg-white rounded-md md:p-5 p-2 gap-y-4">
      <div className="flex justify-center">
        <div className="flex w-72 p-2 items-center rounded-md border border-solid border-gray-300 bg-opacity-5">
          <input type="text" placeholder="Search" className="w-full outline-none bg-transparent" />
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <TableA headers={[{ title: 'Available Institutions' }]} item={institutions.map((institution) => (
          <TranscriptGridItemAdmin
          key={institution._id}
          id={institution._id}
          data={institution.name}
          icon={<HiChevronRight />}
          // onSelect={() => handleSelectInstitution(institution)}  // Pass the institution.name
        />
        
        ))} />
      </div>
    </div>
  );
}

export default AvailableInstitutions;