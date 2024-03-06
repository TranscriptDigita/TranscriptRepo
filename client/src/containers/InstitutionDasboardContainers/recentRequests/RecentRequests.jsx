import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Import Axios for making HTTP requests
import RecentTranscriptTable from '../../../components/table/RecentTranscriptTable';
import { Link } from 'react-router-dom';


function RecentRequests() {
  const [transcripts, setTranscripts] = useState([]); // State variable to store transcript data

  const getInstitutionName = () => {
    const storedUserData = localStorage.getItem('institutionUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.institution?.name;
    }
    return null;
  };

  const institutionName = getInstitutionName();

  console.log('the name is', institutionName  )


     // State to hold the alumni data
     const [alumniData, setAlumniData] = useState({});




     useEffect(() => {
         // Define the API endpoint URL
         const apiUrl = 'https://dacs.onrender.com/api/v1/transcript';
     
         // Make an HTTP GET request to fetch transcripts
         Axios.get(apiUrl)
           .then((response) => {
             // Log the fetched data
             console.log('Fetched data:', response.data);
     
             // Update the state with the fetched data
             setTranscripts(response.data);
     
             // Store the fetched data in local storage under the name "transcriptRequests"
             localStorage.setItem('transcriptRequests', JSON.stringify(response.data));
     
             // Log "Success" if there are no errors
             console.log('Success');
     
             // Process each transcript to get alumni information
             response.data.forEach((transcript) => {
               const alumniId = transcript.createdBy;
     
               // Make an API call to get alumni information
               Axios.get(`https://dacs.onrender.com/api/v1/alumnus/${alumniId}`)
                 .then((alumniResponse) => {
                   // Extract fullName from alumni data
                   const fullName = alumniResponse.data.data.fullName;
     
                   // Update the alumni data state
                   setAlumniData((prevData) => ({
                     ...prevData,
                     [alumniId]: {
                       fullName,
                     },
                   }));
     
                   // Log the fullName for each ID
                   console.log(`FullName for ID ${alumniId}:`, fullName);
                 })
                 .catch((alumniError) => {
                   console.error(`Error fetching alumni data for ID ${alumniId}:`, alumniError);
                 });
             });
           })
           .catch((error) => {
             // Handle errors if any
             console.error('Error fetching transcripts:', error);
           });
       }, []); // The empty dependency array ensures this effect runs once when the component mounts


       const getStatus = (transcript) => {
        if (transcript.isApproved) {
          return 'Approved';
        } else if (transcript.isDeclined) {
          return 'Declined';
        } else if (transcript.isVerified) {
          return 'Verifying';
        } else if (transcript.isQueried) {
          return 'Querying';
        } else {
          return 'No action taken yet';
        }
      };


 
 

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
      title: 'Status'
    },
    {
      title: 'Reference ID'
    },
    {
      title: 'Receipt'
    }
  ];

  // Map the transcripts data to match the table headers
  const formattedItems = transcripts
  .filter(transcript => transcript.institutionName === institutionName)
  .reverse()
  .map((transcript) => ({
    'Name': alumniData[transcript.createdBy]?.fullName || 'No name In the Api Response',
    'Course': transcript.program,
    'Year Graduated': transcript.yearOfGraduation,
    'Status': getStatus(transcript),
    'Reference ID': transcript.referenceId,
    'Receipt': (
      <button
      onClick={() => window.open(`/receipt/${transcript._id}`, '_blank', 'width=600,height=400')}
      className=' text-purple-800 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md'
    >
      View Receipt
    </button>
    
    ),
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
