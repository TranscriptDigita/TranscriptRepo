import React, { useState, useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Table, TranscriptGridItem } from '../../../components';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

function Dashboard() {
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
        console.log(data);
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
        {/* <div className="flex w-72 p-2 items-center rounded-md border border-solid border-gray-300 bg-opacity-5">
          <input type="text" placeholder="Search" className="w-full outline-none bg-transparent" />
        </div> */}
      </div>

      <div className="flex flex-col gap-y-5">
        <Table headers={[{ title: 'Available schools (Select School To Apply For Credentials)' }]} item={institutions.map((institution) => (
          <TranscriptGridItem
          key={institution._id}
          data={institution.name}
          id={institution._id}
          icon={<HiChevronRight />}
          // onSelect={() => handleSelectInstitution(institution)}  // Pass the institution.name
        />
        ))} />
      </div>
    </div>
  );
}

export default Dashboard;