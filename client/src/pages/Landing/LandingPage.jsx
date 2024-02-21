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
    
    const keywordsMetaTag = document.createElement('meta');
    keywordsMetaTag.name = 'keywords';
    keywordsMetaTag.content = 'loumni, transcript, transcript processing, certificate, certificate processing, request for transcript, transcript processing system, academic records system, academy document, process academy document, request academy document, online transcript request system, centralized academy system, certificate system, transcript request';

    const descriptionMetaTag = document.createElement('meta');
    descriptionMetaTag.name = 'description';
    descriptionMetaTag.content = "Loumni is a nationwide academy document processing system. With loumni, alumni/student can request for academic document such as Certificate, transcript, statement of result from their comfort zone and it'll delivered with ease, Restoring the Integrity In the processing of Academic Transcripts and Certificates .";

    document.head.appendChild(keywordsMetaTag);
    document.head.appendChild(descriptionMetaTag);

    return () => {
      // Clean up the added meta tags when the component unmounts
      document.head.removeChild(keywordsMetaTag);
      document.head.removeChild(descriptionMetaTag);
    };
  }, []);

  

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