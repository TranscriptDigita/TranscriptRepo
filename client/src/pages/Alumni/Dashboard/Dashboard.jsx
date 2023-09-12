// react imports
import React from 'react'
import {HiOutlinePlusSmall, HiChevronRight} from 'react-icons/hi2';

// component imports
import { Information, Progress, Table, TranscriptGridItem } from '../../../components'

// mui imports
import { Button } from '@mui/material'

// rrd imports
import { Link } from 'react-router-dom';

// redux imports
import { useSelector } from 'react-redux';

function Dashboard() {

  const { user } = useSelector((state) => state.auth)

  return (
    <div className='flex flex-1 flex-col bg-white rounded-md md:p-5 p-2 gap-y-4'>
     {/**  <div className='flex justify-end'>
      

         <Link to={`/alumni/${user._id}/transcripts/new`}> replaced this to load without logging in 
         <Link to={`/alumni/${user?._id || 'default'}/transcripts/new`}>
          *  <Button
            variant='contained'
            className='bg-blue-400'
            endIcon={<HiOutlinePlusSmall/>}
          >
            New Requestorm
          </Button>
        </Link>
          
      </div>*/}

<div className="flex justify-center">
      <div className="flex w-72 p-2 items-center rounded-md border border-solid border-gray-300 bg-opacity-5">
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none bg-transparent"
        />
        
      </div>
    </div>

       <div className="flex flex-col gap-y-5">
          <Table headers={[{title: 'Available schools'}]} item={ [1, 2, 3, 4, 5].map((item)=>(<TranscriptGridItem data={`University of Jos`} icon={<HiChevronRight/>}/>))}/>
        </div> 
    </div>
  )
}

export default Dashboard