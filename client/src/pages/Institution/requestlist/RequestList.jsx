// react imports
import React from 'react'

// components imports
import { Sidebar } from '../../../components'

// containers imports
import { RecentRequests, TranscriptData, TranscriptGrid } from '../../../containers'

function RequestListPage() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-x-4'>
    <div className='md:col-span-2 flex flex-col gap-y-4'>
        {/* charts section */}
       

        {/* recent request sction */}
        <div className='flex-col  rounded-md  p-5  bg-white'>
            <h4 className='md:text-[18px] font-bold'>Recent Requests</h4>
            <RecentRequests/>
        </div>
    </div>

    <div className='flex flex-col gap-y-4'>
        

        {/* completed request section */}
        <div className='grid grid-cols-1 p-5 rounded-md bg-white'>
            <TranscriptGrid title={`Completed Requests`} />
        </div>

        <div className='grid grid-cols-1 p-5 rounded-md bg-white'>
            <TranscriptGrid title={`Completed Requests`} />
        </div>
    </div>
</div>  
  )
}

export default RequestListPage