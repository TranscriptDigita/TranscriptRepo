// import Input from "../form/Input"
import Button from "../form/Button"

const NewsLetter = () => {
  return (
   <div className="bg-bgprimary h-32 w-10/12 mx-auto rounded-md mb-3"> 
   <div className="flex flex-row p-12">
      <div className="flex-1">
        <div className="w-full text-center">
        <h3 className="text-2xl font-semibold pt-2">Our Newsletter</h3>
        </div>
      </div>
      <div className="flex-1">
       <div className="w-full flex flex-row align-baseline">
         <div className="relative flex items-center mt-2">
          <span className="absolute">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
          </span>
          <input type="email" placeholder="john@example.com" className="block w-full py-1 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-500 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-300 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40" />
          </div>
          <div className="px-1 pt-2">
            <Button btn="Subscribe"/>
          </div>
        </div>
       </div>
      </div>
    </div>
  )
}

export default NewsLetter
