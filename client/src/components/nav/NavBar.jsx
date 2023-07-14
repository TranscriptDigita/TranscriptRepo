import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
        <nav className="w-full flex justify-between bg-white text-gray-800">
        <div className="px-1 xl:px-6 p-4 flex w-3/12 items-center ">
            <a className="text-2xl font-bold font-heading" href="#">
                <h2>TRANSCRIPT360</h2>
            </a>
        </div>
        <div className="px-1 xl:px-6 p-3 flex w-6/12 justify-end">
            <ul className="hidden md:flex w-5/6 mx-4 justify-between text-2xl font-medium space-x-8 align-baseline ">
                <li ><Link to="/login">Home</Link></li>
                <li><Link to="/login">About</Link></li>
                <li><Link to="/login">FAQ</Link></li>
                <li className='bg-primary px-6 py-1 rounded-lg text-white font-medium'><Link to="/login">Sign In</Link></li>
            </ul>
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
