import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Import Axios for making HTTP requests
import RecentTranscriptTable from '../../components/table/RecentTranscriptTable';
import { NewRequestTable } from '../../components';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function NewRequestA() {


  const getStaffInstitutionId = () => {
    const storedUserData = localStorage.getItem('staff');
    if (storedUserData) {
        const userDataObject = JSON.parse(storedUserData);
        return userDataObject?.institution;
    }
    return null;
};
const institutionId = getStaffInstitutionId();

  const [transcripts, setTranscripts] = useState([]); // State variable to store transcript data
    // State to hold the alumni data
    const [alumniData, setAlumniData] = useState({});
    const { token: staffToken } = useParams();




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
        if (transcript.isQueried) {
          return 'Queried';
        } else {
          return 'Not Queried';
        }
      };


    

      const handleQuery = async (transcriptId) => {
        try {
          const queryUrl = `https://dacs.onrender.com/api/v1/transcript/query/${transcriptId}`;
      
          const headers = {
            Authorization: `Bearer ${staffToken}`,
          };
      
          // Log the request data
          console.log('Querying transcript with the following data:', {
            url: queryUrl,
            headers,
          });
      
          // Make the query request
          const queryResponse = await Axios.patch(queryUrl, null, { headers });
      
          // Log the query response
          console.log('Query response:', queryResponse.data);
      
          // Update the transcripts state to mark the transcript as queried
          setTranscripts((prevTranscripts) =>
            prevTranscripts.map((transcript) =>
              transcript._id === transcriptId
                ? { ...transcript, isQueried: true }
                : transcript
            )
          );
           // Reload the page
        window.location.reload();
      
          // Log the reload response
          console.log('Transcript marked as Queried:', transcriptId);
        } catch (error) {
          console.error('Error querying transcript:', error);
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
      title: 'Action'
    },
    {
      title: 'Receipt'
    },
  ];

 // Filter transcripts based on institutionId
const filteredTranscripts = transcripts.filter(transcript => transcript.institutionId === institutionId);

// Reverse the filtered transcripts array
const reversedFilteredTranscripts = filteredTranscripts.reverse();

// Map the reversed filtered transcripts data to match the table headers
const formattedItems = reversedFilteredTranscripts.map((transcript) => ({
  'Name': alumniData[transcript.createdBy]?.fullName || 'No name In the Api Response',
  'Course': transcript.program,
  'Year Graduated': transcript.yearOfGraduation,
  'Status': transcript.isQuerried === true ? 'Queried' : 'Not Queried', // Directly use isQueried property,
  'Reference ID': transcript.referenceId,
  'Action': (
      <select onChange={(e) => {
        switch (e.target.value) {
          case 'query':
            handleQuery(transcript._id);
            break;
          default:
            break;
        }
      }}>
        <option value="submit"> select</option>
        <option value="query">Query</option>
      </select>
    ),

    'Receipt': (
      <button
        onClick={() => window.open(`/receipt/${transcript._id}`, '_blank', 'width=600,height=400')}
      >
        View Receipt
      </button>
    ),
}));

//   console.log(formattedItems);

  return (
    <div>
      {transcripts.length === 0 ? (
        // Display a loading message or spinner when data is being fetched
        <p>Loading...</p>
      ) : (
        // Render the table when data is available
        <NewRequestTable headers={headers} items={formattedItems} />
        
      )}
      
    </div>
  );
}

export default NewRequestA;
