import React from 'react';
import wnuImg from '../../../assets/wnuimg.png';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { HiOutlineChevronDoubleRight } from 'react-icons/hi2';

function WNU() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-y-[15px] md:gap-y-0'>
      <meta
        name='description'
        content='Explore academic credentials processing. Learn about our diverse range of programs, including degrees, certificates, and diplomas. Prepare for a successful career with our accredited and industry-relevant qualifications.'
      />

      {/* Conditionally render the image based on screen size */}
      <div className='flex hidden xl:block'>
        <img src={wnuImg} alt='wnuimg' className='hidden md:block' />
      </div>

      <div className='flex flex-col gap-y-[50px]'>
        <h4 className='font-bold md:text-[45px] text-center md:text-right'>
          Why need us
        </h4>
        <p className='font-light md:text-[40px]'>
          At Loumni we understand the challenges and frustrations that can arise
          when it comes to obtaining your Academic Credentials, That's why we are
          here to simplify the process and provide you with a seamless solution.
          Here's why our customers need us
        </p>
        <div className='flex flex-col gap-y-[16px] md:w-8/12 w-full self-end'>
          <span className='flex items-center p-2 gap-x-2 rounded-full bg-[#F2DF32]'>
            <HiOutlineChevronDoubleRight />
            <p className='text-[18px]'>Time-saving Convenience</p>
          </span>

          <span className='flex items-center p-2 gap-x-2 rounded-full bg-[#FFB6B6]'>
            <HiOutlineChevronDoubleRight />
            <p>Streamlined Efficiency Guaranteed</p>
          </span>

          <span className='flex items-center p-2 gap-x-2 rounded-full bg-[#83DCC7]'>
            <HiOutlineChevronDoubleRight />
            <p>Reliable network</p>
          </span>

          <span className='flex items-center p-2 gap-x-2 rounded-full bg-[#CACACA]'>
            <HiOutlineChevronDoubleRight />
            <p>Expert Support and Feedback system</p>
          </span>
        </div>

        {/* Uncomment to display button */}
        {/* <Link className='self-end'>
          <Button variant='contained' className='bg-[#6B3FA0] lowercase'>
            Explore our services
          </Button>
        </Link> */}
      </div>
    </div>
  );
}

export default WNU;
