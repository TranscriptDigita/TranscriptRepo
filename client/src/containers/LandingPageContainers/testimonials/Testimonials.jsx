import React, { useState, useEffect } from 'react';
import '../testimonials/testimonial.css'; // Import CSS file for styling

function Testimonials() {
  const testimonies = [
    { name: 'Sarah Adie', testimony: 'Loumni made requesting academic documents a breeze! I was able to easily submit requests for my certificates and transcripts, and the process was seamless. Highly recommend!' },
    { name: 'Michael Okanu', testimony: 'As a busy professional, I needed a quick and efficient way to request my academic documents. Loumni exceeded my expectations with its user-friendly interface and fast processing times.' },
    { name: 'Michael Okanu', testimony: 'Loumni saved me so much time and hassle when I needed to request my statement of results. The platform is intuitive, and I received my documents promptly. Thank you for making this process hassle-free!' },
    { name: 'Dauda Isaac', testimony: 'Loumni saved me so much time and hassle when I needed to request my statement of results. The platform is intuitive, and I received my documents promptly. Thank you for making this process hassle-free!' },
    { name: 'Godwin Ikpe', testimony: 'I cant recommend Loumni enough! Whether its requesting transcripts or certificates, the platform is incredibly convenient and efficient. Its a must-have for anyone navigating the academic world' },
    { name: 'Ali Mamman', testimony: 'Loumni streamlines the entire document processing experience. From submitting requests to receiving the final documents, everything is smooth and hassle-free. A game-changer for students and professionals alike' },
   
    // Add more testimonies as needed
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? testimonies.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide => (prevSlide === testimonies.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide === testimonies.length - 1 ? 0 : prevSlide + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId);
  }, [testimonies.length]);

  return (
    <div className='testimonials-container'>
      <div className='testimonials-content'>
        <h4 className='testimonials-title'>Testimonials from our valued users</h4>
        <p className='testimonials-description'>Discover what our satisfied users are saying about their experience with our transcript retrieval services</p>

        <div className='testimonial-slide'>
          <p className='testimonial-text'>{testimonies[currentSlide].testimony}</p>
          <p className='testimonial-name'>{testimonies[currentSlide].name}</p>
        </div>

        <div className='testimonial-controls'>
          <button className='prev' onClick={handlePrev}>Previous</button>
          <button className='next' onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;