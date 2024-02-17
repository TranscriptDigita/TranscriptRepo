// mui imports
import { Button } from '@mui/material';

// react imports
import React, { useState, useEffect } from 'react';

// rrd imports
import { Link } from 'react-router-dom';

// assets imports
import headerImg from '../../../assets/headerimg.png';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: 'Your Transcripts, Simplified Access, Request, Delivered',
      description:
        'Accelerate your educational journey with our simplified transcript retrieval platform. Gain easy access to your transcripts, effortlessly request official records, and pave the way to your success.',
      buttonText: 'Verify Certificate',
      linkTo: '/verifycertificate',
      image: headerImg,
    },
    {
      title: 'Central Academic Credentials Portal (CACP)',
      description:
        ' Central Transcript Issuance and Verification System, Database Storage for digitized academic credentials Get your transcript processed and verified within 24hrs',
      buttonText: 'Verify Certificate',
      linkTo: '/verifycertificate',
      image: headerImg,
    },
    {
      title: 'Central Certificate and Statement of Results Issuance and Verification',
      description:
        'Get your statement of result processed and issued within 48hrs..',
      buttonText: 'Verify Certificate',
      linkTo: '/selectlogin',
      image: headerImg,
    },
    {
      title: 'The End-to-End Academic Credential Management',
      description:
        'Request, Generate, Digitalize, Send, Receive, Evaluate, Verify, Store and share academic credentials',
      buttonText: 'Verify Certificate',
      linkTo: '/verifycertificate',
      image: headerImg,
    },
  ];

  const handleSlideChange = (step) => {
    const newSlide = (currentSlide + step + slides.length) % slides.length;
    setCurrentSlide(newSlide);
  };

  // Automatically change the slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleSlideChange(1);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide]);

  return (
    <div className='flex-1 grid md:grid-cols-2 grid-cols-1 gap-y-4 md:gap-y-0'>
      <meta name="description" content="Explore academic credentials processing. Learn about our diverse range of programs, including degrees, certificates, and diplomas. Prepare for a successful career with our accredited and industry-relevant qualifications."/>

      <div className='flex flex-col bg-white justify-center gap-y-4'>
     
        <h1 className='md:text-[60px] text-[30px] font-bold leading-none'>
          {slides[currentSlide].title}
        </h1>
        <p className='md:text-[16px] text-[12px] font-light'>
          {slides[currentSlide].description}
        </p>
        <Link to={slides[currentSlide].linkTo}>
          <Button variant='contained' className='bg-[#6B3FA0]'>
            {slides[currentSlide].buttonText}
          </Button>
        </Link>
        <div>
        {/* <button onClick={() => handleSlideChange(-1)}>
            <HiChevronLeft />
          </button>
          <button onClick={() => handleSlideChange(1)}>
            <HiChevronRight />
          </button> */}
        </div>
      </div>
      <div className='flex'>
        <img src={slides[currentSlide].image} alt='headerimg' />
      </div>
    </div>
  );
}

export default Header;
