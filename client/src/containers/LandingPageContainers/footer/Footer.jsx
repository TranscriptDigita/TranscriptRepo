// react imports
import React from 'react'
import { Link } from 'react-router-dom'

// icons imports
import { FaFacebookF, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa6'

function Footer() {
  return (
    <div className='md:h-[300px] md:w-full  flex flex-col text-white'>
       <meta name="description" content="Explore academic credentials processing. Learn about our diverse range of programs, including degrees, certificates, and diplomas. Prepare for a successful career with our accredited and industry-relevant qualifications."/>

        <div className="flex flex-col bg-[#6B3FA0] -mx-5 p-5">
            <div className='grid grid-cols-1 gap-y-5 md:grid-cols-5 gap-x-[20px] md:h-72'>
                <div>
                    <h4>Loumni</h4>
                </div>

                <div className='flex flex-col gap-y-[8px]'>
                    <h4 className='font-semibold'>About us</h4>
                    <ul className='text-[14px] font-light gap-y-[6px]'>
                        <li>About</li>
                        <li>Blog</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-y-[8px]'>
                    <h4 className='font-semibold'>Services</h4>
                    <ul className='text-[14px] font-light gap-y-[6px]'>
                        <li>Document Request</li>
                        <li>Document Approval</li>
                        <li>Document Delivery</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-y-[8px]'>
                    <h4 className='font-semibold'>Contact Us</h4>
                    <ul className='text-[14px] font-light gap-y-[6px]'>
                        <li>+2349167700622</li>
                    </ul>
                </div>

                <div className='flex flex-col gap-y-[8px]'>
                    <h4 className='font-semibold'>Social</h4>
                    <div className='grid grid-cols-4 gap-x-[6px]'>
                      <Link>
                        <FaFacebookF size={20}/>
                      </Link>
                        
                      <Link>
                        <FaLinkedin size={20}/>
                      </Link>

                      <Link>
                        <FaInstagram size={20}/>
                      </Link>

                      <Link>
                        <FaTwitter size={20}/>
                      </Link>  
                        
                    </div>
                </div>
            </div>
            <hr />
            <span className='flex justify-center items-end'>     
                <small className='font-light'> Loumni All Right reserved</small>
                {/* @{Date.now()} */}
            </span>
        </div>     
    </div>
  )
}

export default Footer