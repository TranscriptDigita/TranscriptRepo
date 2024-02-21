import { Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react'

function Error() {
  return (
    <div className='text-[#6B3FA0] grid grid-cols-1 flex items-center justify-items-center justify-center gap-y-4'>
        <h1 className=' md:text-[300px] font-bold text-[150px]'>404</h1>
        <p>Oooooops!... page not found</p>
        <Link to={`/`}>
        <Button
            variant='contained'
            className='lowercase bg-[#6B3FA0]'
        >
            Go back home
        </Button>
        </Link>
    </div>
  )
}

export default Error