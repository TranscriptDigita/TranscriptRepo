// react imports
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

// icons imports
import { FaFacebookF, FaLinkedin, FaInstagram, FaTwitter } from 'react-icons/fa6'

function Footer() {

  useEffect(() => {
    // Append Tawk.to script to document body
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/65d5c70c8d261e1b5f6309b1/1hn5h33m1';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    `;
    document.body.appendChild(script);

    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
                        
                        <li>+2347041417901</li>
                        <li>+2349031576385</li>
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
