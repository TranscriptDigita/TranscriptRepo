// react imports
import React from 'react'

// components imports
import { Sidebar, StaffNavBar, StaffNavBarB } from '../../../components'

// containers imports
import { ChartSection, EvaluationGrid, NewRequest, RecentRequests, TranscriptData, TranscriptGrid } from '../../../containers'

function Dashboard() {
  return (
   
        <div className='md:col-span-2 flex flex-col gap-y-4 mt-10'>
            <StaffNavBarB/>
            {/* charts section */}
            {/* <div className="flex flex-col bg-white rounded-md md:h-1/2">
                <ChartSection/>
            </div> */}

            {/* recent request sction */}
        
                <h4 className='md:text-[18px] font-bold'>Document Requests (You Can Approve, Decline, And Verify A Document Request Under Actions)</h4>
                {/* <RecentRequests/> */}
                <NewRequest/>
           
        </div>

       
  )
}

export default Dashboard