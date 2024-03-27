import React, { useState, useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Table, TranscriptGridItem, TranscriptGridItemProgress } from '../../../../components';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

function TrackingPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [transcripts, setTranscripts] = useState([]);
  const { id: alumniId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/transcript/all/${alumniId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data)) {
          // Reverse the array to display from last to first
          setTranscripts(data.reverse());
          
        } else {
          console.error('Invalid data structure. Expected an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [alumniId, user.token]);

  const getUserId = () => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.alumni._id;
    }
    return null;
  };

  const userId = getUserId();

  return (
    <div className="flex flex-1 flex-col bg-white rounded-md md:p-5 p-2 gap-y-4">
      
      <Link to={`/alumni/${userId}/dashboard`} className="flex-shrink-0">
  <Button variant='contained' className='bg-[#6B3FA0] '>
    Credential Application
  </Button>
</Link>

     

      <div className="flex flex-col gap-y-5">
        <Table headers={[{ title: 'Applied Credentials' }]} item={transcripts.map((transcript) => (
          <TranscriptGridItemProgress
            key={transcript._id}
            data={transcript.institutionName}
            dataa={transcript.typeOfDocument}
            id={transcript._id}  // Display institution name
            icon={<HiChevronRight />}
            // You can customize the content based on your requirements
            additionalInfo={`Degree Type: ${transcript.degreeType}, Faculty: ${transcript.faculty}, Department: ${transcript.department}, Year of Graduation: ${transcript.yearOfGraduation}`}
            // Add more properties as needed
          />
        ))} />
      </div>
    </div>
  );
}

export default TrackingPage;
