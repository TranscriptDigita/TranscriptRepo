import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import servicesImg1 from '../../../assets/services1.png';
import servicesImg2 from '../../../assets/services2.png';
import servicesImg3 from '../../../assets/services3.png';
import servicesCarousal1 from '../../../assets/C1.jpg';
import servicesCarousal2 from '../../../assets/C2.jpg';
import servicesCarousal3 from '../../../assets/C3.jpg';

function Services() {
  const images = [servicesImg1, servicesImg2, servicesImg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getPreviousIndex = (currentIndex, length) => {
    return currentIndex === 0 ? length - 1 : currentIndex - 1;
  };

  const getNextIndex = (currentIndex, length) => {
    return currentIndex === length - 1 ? 0 : currentIndex + 1;
  };

  const prevIndex = getPreviousIndex(currentImageIndex, images.length);
  const nextIndex = getNextIndex(currentImageIndex, images.length);

  const slideContent = [
    {
      title: 'Easy Transcript Access',
      list: ['Instant Access', 'User-Friendly access'],
    },
    {
      title: 'Transcript Request',
      list: ['Request Management', 'Digital Request'],
    },
    {
      title: 'Comprehensive Coverage',
      list: ['Wide coverage', 'Reliable partnerships'],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-screen-xl">
        <div className="flex flex-col items-center gap-y-[50px]">
          <div className="flex flex-col items-center md:w-7/12 gap-y-[8px]">
            <h4 className="font-bold md:text-[40px]">Our Services</h4>
            <p className="font-light md:text-[16px]">
              Unlock the Convenience of our streamlined services and experience the power of hassle-free transcript retrieval. Say goodbye to time-consuming paperwork and frustrating bureaucracy.
            </p>
          </div>

          <div className="w-full flex items-center justify-center md:grid-cols-4 md:gap-x-[20px] gap-[20px]" >
          <div className="carousel-slide">
              <HiChevronLeft color='purple' size={32} onClick={() => setCurrentImageIndex(prevIndex)} />
            </div>
            <div className="carousel-slide">
              <img src={images[prevIndex]} alt={`services${prevIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="carousel-slide">
              <img src={images[currentImageIndex]} alt={`services${currentImageIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              <div className="flex flex-col p-3" >
                <h4 className=" ">{slideContent[currentImageIndex].title}</h4>
                <ul className="font-light p-2 md:text-[16px]">
                  {slideContent[currentImageIndex].list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="carousel-slide">
              <img src={images[nextIndex]} alt={`services${nextIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div className="carousel-slide">
              <HiChevronRight color='purple' size={32} onClick={() => setCurrentImageIndex(nextIndex)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
