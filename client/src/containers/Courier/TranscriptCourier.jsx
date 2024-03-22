import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Import Axios for making HTTP requests
import { TranscriptTableCourier } from '../../components';
import { useParams } from 'react-router-dom';

function TranscriptCourier() {
  const [transcripts, setTranscripts] = useState([]); // State variable to store transcript data
  const [loading, setLoading] = useState(true); // State variable to track loading state
  const { id } = useParams();

  // Function to extract institution ID from stored data
  const getCourierName = () => {
    const storedUserData = localStorage.getItem('courier');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.logistic?.businessName;
    }
    return null;
  };

  const courier = getCourierName();

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = `https://dacs.onrender.com/api/v1/transcript/fetchall/${courier}`;

    // Make an HTTP GET request to fetch transcripts for the specified courier
    Axios.get(apiUrl)
      .then((response) => {
        // Log the fetched data
        console.log('Fetched data:', response.data);

        // Update the state with the fetched data
        setTranscripts(response.data);

        // Set loading state to false
        setLoading(false);

        // Log "Success" if there are no errors
        console.log('Success');
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error fetching transcripts:', error);

        // Set loading state to false
        setLoading(false);
      });
  }, [courier]); // Include courier in dependency array to re-fetch when it changes

  // Table headers
  const headers = [
    { title: 'Name' },
    { title: 'Course' },
    { title: 'Year Graduated' },
    { title: 'Status' },
    { title: 'Reference ID' },
  
    { title: 'Action' } // Add a new header for the action button
  ];

  // Function to handle confirming pick up
  const confirmPickUp = (transcriptId) => {
    // Define the API endpoint URL for confirming pick up
    const apiUrl = `https://dacs.onrender.com/api/v1/transcript/picked/${transcriptId}/${id}`;

    // Make an HTTP GET request to confirm pick up
    Axios.get(apiUrl)
      .then((response) => {
        // Log the response
        console.log('Confirmation response:', response.data);
        // Optionally, you can perform additional actions here if needed
        window.location.reload();
      })
      .catch((error) => {
        // Handle errors if any
        console.error('Error confirming pick up:', error);
        // Optionally, you can display an error message to the user
      });
  };

  // Map the transcripts data to match the table headers
  const formattedItems = transcripts.map((transcript) => ({
    'Name': transcript.recipientEmail,
    'Course': transcript.program,
    'Year Graduated': transcript.yearOfGraduation,
    'Status': transcript.isPickedUp ? 'Picked Up' : 'Not Picked Up',
    'Reference ID': transcript.referenceId,
   
    'Action': (
      <button
        onClick={() => confirmPickUp(transcript._id)}
        className=' bg-purple-400 text-purple-800 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md'
      >
        Confirm Pick Up
      </button>
    )
  }));

  return (
    <div>
      {loading ? (
        // Display a loading message or spinner when data is being fetched
        <p>Loading...</p>
      ) : (
        // Render the table when data is available
        <TranscriptTableCourier headers={headers} items={formattedItems} />
      )}
    </div>
  );
}

export default TranscriptCourier;
