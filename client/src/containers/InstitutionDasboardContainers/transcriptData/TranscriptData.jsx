import React, { useEffect, useState } from 'react';
import { TranscriptDataItem } from '../../../components';

function TranscriptData({ title }) {
  const [transcriptData, setTranscriptData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://dacs.onrender.com/api/v1/transcript')
      .then(response => response.json())
      .then(data => setTranscriptData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getTotalTranscripts = () => transcriptData.length;

  const getTotalVerifiedTranscripts = () =>
    transcriptData.filter(item => item.isVerified).length;

  const getTotalUploadedTranscripts = () =>
    transcriptData.filter(item => item.isApproved).length;

  const getTotalRejectedTranscripts = () =>
    transcriptData.filter(item => item.isDeclined).length;

  const getTotalQueriedTranscripts = () =>
    transcriptData.filter(item => item.isQuerried).length;

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
