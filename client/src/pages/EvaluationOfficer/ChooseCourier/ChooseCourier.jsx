  // react imports
  import React from 'react'
  import {HiOutlinePlusSmall, HiChevronRight} from 'react-icons/hi2';

  // component imports
  import { Information, Progress, Table, CourierGridItems } from '../../../components'

  // mui imports
  import { Button } from '@mui/material'

  // rrd imports
  import { Link } from 'react-router-dom';

  // redux imports
  import { useSelector } from 'react-redux';

  function ChooseCourier() {

    const { user } = useSelector((state) => state.auth)

    return (
      <div className='flex flex-1 flex-col bg-white rounded-md md:p-5 p-2 gap-y-4'>
      

  <div className="flex justify-center">
        {/* <div className="flex w-72 p-2 items-center rounded-md border border-solid border-gray-300 bg-opacity-5">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none bg-transparent"
          />
          
        </div> */}
      </div>

        <div className="flex flex-col gap-y-5">
            <Table headers={[{title: 'Select A Courier To Use'}]} item={ [1, 2, 3, 4, 5].map((item)=>(<CourierGridItems data={`GIG Logistics`} icon={<HiChevronRight/>}/>))}/>
          </div> 
      </div>
    )
  }

  export default ChooseCourier