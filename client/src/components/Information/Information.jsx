import React from 'react'

function Information({title,  studentName, schoolName, status}) {
  return (
    <div className='flex flex-col gap-y-4'>
        <h4 className='font-semibold'>{title}</h4>
        <p className='font-light text-[14px]'>Dear {studentName},
        We are pleased to inform you that your request for a transcript from {schoolName}  {status}. Our team acknowledges the importance of this request and is dedicated to processing it promptly.
        Please note that the processing time may take up to two weeks due to the high volume of requests we receive. We appreciate your patience during this period as we ensure the accuracy and quality of the transcripts we provide.`</p>
    </div>
  )
}

export default Information