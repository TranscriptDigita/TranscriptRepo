// react imports
import React from 'react'

// components imports
import { Sidebar, StaffNavBar, StaffNavBarB } from '../../../components'

// containers imports
import { ChartSection, EvaluationGrid, NewRequest, RecentRequests, TranscriptCourier, TranscriptData, TranscriptGrid } from '../../../containers'

function Dashboard() {
  return (
   
        <div className='md:col-span-2 flex flex-col gap-y-4 mt-10'>
            {/* <StaffNavBarB/> */}
            {/* charts section */}
            {/* <div className="flex flex-col bg-white rounded-md md:h-1/2">
                <ChartSection/>
            </div> */}

            {/* recent request sction */}
        
                <h4 className='md:text-[18px] font-bold'> List Of Documents Requested To Your Courier</h4>
                {/* <RecentRequests/> */}
               <TranscriptCourier/>
           
        </div>

       
  )
}

export default Dashboard