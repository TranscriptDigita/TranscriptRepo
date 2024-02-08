import React, { useState, useEffect } from 'react';
import { TranscriptGridItem } from '../../../components';
import { HiCheckCircle } from 'react-icons/hi2';

function TranscriptGrid({ title }) {
  const [transcriptData, setTranscriptData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dacs.onrender.com/api/v1/transcript');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setTranscriptData(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Filter transcripts where isApproved is true
  const approvedTranscripts = transcriptData.filter((transcript) => transcript.isApproved);

  // Sort the approved transcripts based on createdAt in descending order
  const sortedTranscripts = approvedTranscripts.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Get the first five items from the sorted array
  const recentApprovedTranscripts = sortedTranscripts.slice(0, 5);

  return (
    <div className='flex flex-col w-full gap-y-[8px]'>
      {title && <h4>{title}</h4>}

      <div className='grid grid-cols-1 gap-y-[8px]'>
        {recentApprovedTranscripts.map((transcript) => (
          <TranscriptGridItem
            key={transcript._id}
            icon={<HiCheckCircle fill='#4BD37B' size={25} />}
            data={transcript.referenceId}
          />
        ))}
      </div>
    </div>
  );
}

export default TranscriptGrid;
