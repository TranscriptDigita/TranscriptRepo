import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Import Axios for making HTTP requests
import RecentTranscriptTable from '../../../components/table/RecentTranscriptTable';
import { NewRequestTable } from '../../../components';
import { Link } from 'react-router-dom';

function NewRequest() {
  const [documents, setDocuments] = useState([]); // State variable to store transcript data
    // State to hold the alumni data
    const [alumniData, setAlumniData] = useState({});


    const getStaffInstitutionId = () => {
      const storedUserData = localStorage.getItem('staff');
      if (storedUserData) {
          const userDataObject = JSON.parse(storedUserData);
          return userDataObject?.institution;
      }
      return null;
  };
  const institutionId = getStaffInstitutionId();



    useEffect(() => {
        // Define the API endpoint URL
        const apiUrl = 'https://dacs.onrender.com/api/v1/transcript';
    
        // Make an HTTP GET request to fetch transcripts
        Axios.get(apiUrl)
          .then((response) => {
            // Log the fetched data
            console.log('Fetched data:', response.data);
    
            // Update the state with the fetched data
            setDocuments(response.data);
    
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



      const handleVerify = async (transcriptId) => {
        try {
          const tokenData = localStorage.getItem('stafftoken');
      
          if (!tokenData) {
            console.error('No token found');
            return;
          }
      
          const token = tokenData.trim(); // Remove any leading/trailing whitespace
      
          if (!token) {
            console.error('Invalid token format');
            console.log('Token data:', tokenData);
            return;
          }
      
          const verifyUrl = `https://dacs.onrender.com/api/v1/transcript/verify/${transcriptId}`;
      
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          // Log the request data
          console.log('Verifying transcript with the following data:', {
            url: verifyUrl,
            headers,
          });
      
          // Make the verification request
          const verifyResponse = await Axios.patch(verifyUrl, null, { headers });
      
          // Log the verification response
          console.log('Verification response:', verifyResponse.data);
      
          // Reload the transcripts after verification
          const reloadResponse = await Axios.get('https://dacs.onrender.com/api/v1/transcript');
          setDocuments(reloadResponse.data);
      
          // Log the reload response
          console.log('Transcripts reloaded:', reloadResponse.data);
        } catch (error) {
          console.error('Error verifying transcript:', error);
        }
      };
      



      const handleApprove = async (transcriptId) => {
        try {
          const tokenData = localStorage.getItem('stafftoken');
      
          if (!tokenData) {
            console.error('No token found');
            return;
          }
      
          const token = tokenData.trim();
      
          if (!token) {
            console.error('Invalid token format');
            console.log('Token data:', tokenData);
            return;
          }
      
          const approveUrl = `https://dacs.onrender.com/api/v1/transcript/approve/${transcriptId}`;
      
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          // Log the request data
          console.log('Approving transcript with the following data:', {
            url: approveUrl,
            headers,
          });
      
          // Make the approval request
          const approveResponse = await Axios.patch(approveUrl, null, { headers });
      
          // Log the approval response
          console.log('Approval response:', approveResponse.data);
      
          // Reload the transcripts after approval
          const reloadResponse = await Axios.get('https://dacs.onrender.com/api/v1/transcript');
          setDocuments(reloadResponse.data);
      
          // Log the reload response
          console.log('Transcripts reloaded:', reloadResponse.data);
        } catch (error) {
          console.error('Error approving transcript:', error);
        }
      };
      

      const handleDecline = async (transcriptId) => {
        try {
          const tokenData = localStorage.getItem('stafftoken');
      
          if (!tokenData) {
            console.error('No token found');
            return;
          }
      
          const token = tokenData.trim();
      
          if (!token) {
            console.error('Invalid token format');
            console.log('Token data:', tokenData);
            return;
          }
      
          const declineUrl = `https://dacs.onrender.com/api/v1/transcript/decline/${transcriptId}`;
      
          const headers = {
            Authorization: `Bearer ${token}`,
          };
      
          // Log the request data
          console.log('Declining transcript with the following data:', {
            url: declineUrl,
            headers,
          });
      
          // Make the decline request
          const declineResponse = await Axios.patch(declineUrl, null, { headers });
      
          // Log the decline response
          console.log('Decline response:', declineResponse.data);
      
          // Reload the transcripts after declining
          const reloadResponse = await Axios.get('https://dacs.onrender.com/api/v1/transcript');
          setDocuments(reloadResponse.data);
      
          // Log the reload response
          console.log('Transcripts reloaded:', reloadResponse.data);
        } catch (error) {
          console.error('Error declining transcript:', error);
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
const filteredTranscripts = documents.filter(transcript => transcript.institutionId === institutionId);

// Reverse the filtered transcripts array
const reversedFilteredTranscripts = filteredTranscripts.reverse();

// Map the reversed filtered transcripts data to match the table headers
const formattedItems = reversedFilteredTranscripts.map((transcript) => ({
    'Name': alumniData[transcript.createdBy]?.fullName || 'No name In the Api Response',
    'Course': transcript.program,
    'Year Graduated': transcript.yearOfGraduation,
    'Status': getStatus(transcript),
    'Reference ID': transcript.referenceId,
    'Action': (
        <select onChange={(e) => {
          switch (e.target.value) {
            case 'verify':
              handleVerify(transcript._id);
              break;
            case 'approve':
              handleApprove(transcript._id);
              break;
            case 'decline':
              handleDecline(transcript._id);
              break;
            case 'query':
              handleQuery(transcript._id);
              break;
            default:
              break;
          }
        }}>
          <option value="submit"> Select </option>
          <option value="approve">Approve</option>
          <option value="decline">Decline</option>
          
          <option value="verify">Verify</option>
        </select>
      ),
      'Receipt': (
        <button
          onClick={() => window.open(`/receipt/${transcript._id}`, '_blank', 'width=600,height=400')}
          className=' bg-purple-400 text-purple-800 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md'
        >
          View Receipt
        </button>
      ),
   
  }));

  console.log(formattedItems);

  return (
    <div>
      {documents.length === 0 ? (
        // Display a loading message or spinner when data is being fetched
        <p>Loading...</p>
      ) : (
        // Render the table when data is available
        <NewRequestTable headers={headers} items={formattedItems} />
        
      )}
      
    </div>
  );
}

export default NewRequest;
