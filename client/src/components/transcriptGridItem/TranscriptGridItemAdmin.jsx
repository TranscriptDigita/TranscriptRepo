import React from 'react'

import {HiCheckCircle} from 'react-icons/hi2'

import { Link, useNavigate  } from 'react-router-dom'

import { Button } from '@mui/material'

function  TranscriptGridAdmin({ data, icon, selectedInstitutionName }) {
 
  const navigate = useNavigate();

  const handleLinkClick = () => {
    navigate(`/alumni/${data}/transcripts/newrequest`, { state: { data } });
    console.log("Value of data:", data);
  };

  // const handleLinkClick = () => {
  //   console.log("Value of data:", data);
  // };
  return (
    <Link to={{
      pathname: `/alumni/${data}/transcripts/newrequest`,
      
    }}
    onClick={handleLinkClick}> {/** Added Link To the Table Items To Open The Request Track And Delivery Page */}
    <div className='flex w-full items-center rounded-lg justify-between md:p-4 p-2 bg-[#6B3FA0] cursor-pointer bg-opacity-5 hover:border hover:border-[#6B3FA0]'>
        
        <Button className={``}>
          <h4 className='md:text-[14px]'>{data}</h4>
        </Button>
        
        <div>
          {icon && icon}
        </div>
       
    </div>
    </Link>
  )
}

export default TranscriptGridAdmin