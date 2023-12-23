import React, { useState, useEffect } from 'react';
import { HiChevronRight } from 'react-icons/hi';
import { Table, TranscriptGridItem } from '../../../../components';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function TrackingPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [transcripts, setTranscripts] = useState([]);
  const { id: alumniId } = useParams();

  useEffect(() => {
    console.log('Token:', user.token);
    console.log('Alumni ID:', alumniId);
  
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/transcript/${alumniId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data && data.transcripts) {
          setTranscripts(data.transcripts);
          console.log('Fetched data:', data);
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
  
    fetchData();
  }, [alumniId, user.token]);


  return (
    <div className="flex flex-1 flex-col bg-white rounded-md md:p-5 p-2 gap-y-4">
      <div className="flex justify-center">
        <div className="flex w-72 p-2 items-center rounded-md border border-solid border-gray-300 bg-opacity-5">
          <input type="text" placeholder="Search" className="w-full outline-none bg-transparent" />
        </div>
      </div>

      <div className="flex flex-col gap-y-5">
        <Table headers={[{ title: 'Available transcripts' }]} item={transcripts.map((transcript) => (
          <TranscriptGridItem
            key={transcript._id}
            data={transcript.name} // Assuming there's a property named 'name' in your transcript object
            icon={<HiChevronRight />}
          />
        ))} />
      </div>
    </div>
  );
}

export default TrackingPage;
