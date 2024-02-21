import React, { useEffect, useState } from 'react';
import { TranscriptDataItem } from '../../../components';

function TranscriptData({ title }) {
  const [transcriptData, setTranscriptData] = useState([]);

  const getInstitutionName = () => {
    const storedUserData = localStorage.getItem('institutionUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.institution?.name;
    }
    return null;
  };
  
  const institutionName = getInstitutionName();
  
  useEffect(() => {
    // Fetch data from the API
    fetch('https://dacs.onrender.com/api/v1/transcript')
      .then(response => response.json())
      .then(data => {
        // Filter transcripts based on institutionName
        console.log('the response', data)
        const filteredData = data.filter(item => item.institutionName === institutionName);
        setTranscriptData(filteredData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [institutionName]);
  
  const getTotalTranscripts = () => transcriptData.length;
  
  const getTotalVerifiedTranscripts = () =>
    transcriptData.filter(item => item.isVerified).length;
  
  const getTotalUploadedTranscripts = () =>
    transcriptData.filter(item => item.isApproved).length;
  
  const getTotalRejectedTranscripts = () =>
    transcriptData.filter(item => item.isDeclined).length;
  
  const getTotalQueriedTranscripts = () =>
    transcriptData.filter(item => item.isQuerried).length;
  
  // Logging the values
  console.log("transcriptData:", transcriptData);
  console.log("institutionName:", institutionName);
  console.log("Total Transcripts:", getTotalTranscripts());
  console.log("Total Verified Transcripts:", getTotalVerifiedTranscripts());
  console.log("Total Uploaded Transcripts:", getTotalUploadedTranscripts());
  console.log("Total Rejected Transcripts:", getTotalRejectedTranscripts());
  console.log("Total Queried Transcripts:", getTotalQueriedTranscripts());
  

  return (
    <div className="flex flex-col gap-y-4">
      {title && <h4 className="font-bold">{title}</h4>}
      <hr />
      <div className="flex flex-col gap-y-2">
        <TranscriptDataItem
          dataName="Total Transcript request"
          number={getTotalTranscripts()}
        />
        <TranscriptDataItem
          dataName="Total Transcript verified"
          number={getTotalVerifiedTranscripts()}
        />
        <TranscriptDataItem
          dataName="Total Transcript approved"
          number={getTotalUploadedTranscripts()}
        />
        <TranscriptDataItem
          dataName="Total Transcript rejected"
          number={getTotalRejectedTranscripts()}
        />
        <TranscriptDataItem
          dataName="Total Transcript Queried"
          number={getTotalQueriedTranscripts()}
        />
      </div>
    </div>
  );
}

export default TranscriptData;
