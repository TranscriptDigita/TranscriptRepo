// react imports
import React from 'react'

// containers imports
import { Contact, Footer, Header, OurPartners, Services, Testimonials, WNU } from '../../containers'
import { Navbar } from '../../components'
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const scrollToSection = (id) => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    switch (location.hash) {
      case '#services':
        scrollToSection('services');
        break;
      case '#testimonials':
        scrollToSection('testimonials');
        break;
      case '#contact':
        scrollToSection('contact');
        break;
      // Add cases for other sections as needed
      default:
        break;
    }
  }, [location]);

  return (
    <div className='flex flex-col flex-1 md:p-5 p-3 mt-5 gap-y-[50px]'>
      <Navbar/>
        <Header/>
        <WNU/>
        <div id="services"></div>
        <Services/>
        <OurPartners/>
        <div id="testimonials"></div>
        <Testimonials/>
        <div id="contact"></div>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default LandingPage