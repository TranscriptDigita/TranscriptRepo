import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Import Axios for making HTTP requests
import RecentTranscriptTable from '../../../components/table/RecentTranscriptTable';

function RecentRequests() {
  const [transcripts, setTranscripts] = useState([]); // State variable to store transcript data




  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = 'https://transcriptdigita-api.onrender.com/api/v1/transcript';

    // Make an HTTP GET request to fetch transcripts
    Axios.get(apiUrl)
      .then((response) => {
        // Log the fetched data
        console.log('Fetched data:', response.data);
           // Log "Success" if there are no errors
           console.log('Success');
        // Update the state with the fetched data
        setTranscripts(response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error fetching transcripts:', error);
      });
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  const headers = [
    {
      title: 'Name'
    },
    {
      title: 'Course'
    },
    {
      title: 'Year Graduated'
    },
    {
      title: 'Action'
    },
    {
      title: 'Request Number'
    }
  ];

  // Map the transcripts data to match the table headers
  const formattedItems = transcripts.map((transcript) => ({
    'Name': transcript.name,
    'Course': transcript.program,
    'Year Graduated': transcript.yearOfGraduation,
    'Action': 'Process', // You can set this value as needed
    'Request Number': transcript.referenceId,
  }));

  console.log(formattedItems);

  return (
    <div>
      {transcripts.length === 0 ? (
        // Display a loading message or spinner when data is being fetched
        <p>Loading...</p>
      ) : (
        // Render the table when data is available
        <RecentTranscriptTable headers={headers} items={formattedItems} />
      )}
    </div>
  );
}

export default RecentRequests;
