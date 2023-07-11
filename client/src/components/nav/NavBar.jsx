import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
        <nav className="w-full flex justify-between bg-white text-gray-800">
        <div className="px-1 xl:px-6 p-3 flex w-3/12 items-center ">
            <a className="text-2xl font-bold font-heading" href="#">
                <h2>TRANSCRIPT360</h2>
            </a>
        </div>
        <div className="px-1 xl:px-6 p-3 flex w-6/12 justify-end">
            <ul className="hidden md:flex w-5/6 mx-4 justify-between text-xl font-semibold font-heading space-x-8 align-baseline ">
                <li ><Link to="/login">Home</Link></li>
                <li><Link to="/login">About</Link></li>
                <li><Link to="/login">FAQ</Link></li>
                <li className='bg-primary px-6 py-1 rounded-lg text-white'><Link to="/login">Sign In</Link></li>
            </ul>
            {/* <div className="hidden xl:flex items-center space-x-5 ">
            <a className="hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            </a>
            <a className="flex items-center hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                    </span>
                </span>
            </a>
            <a className="flex items-center hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </a>
            
            </div> */}
        </div>
    
        <a className="navbar-burger self-center mr-12 md:hidden" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </a>
        </nav>
        
  )
}

export default NavBar
