import Input from "../../../components/Input"
import InputLabel from "../../../components/InputLabel"
import Button from "../../../components/Button"
import {FaLinkedin} from "react-icons/fa"
import {ImGooglePlus3} from "react-icons/im"
const Signup = () => {
  return (
    <div className="bg-indigo-800">
        <div className="bg-white m-auto w-7/12 p-5">
        <h2 className="text-2xl mb-2 text-center">Sign Up With</h2>
        <div className="flex flex-wrap w-full m-auto justify-center">
            <div className ="w-3/6 px-16 md:mb-0">
                {/* <InputLabel label="FirstName" /> */}
                <FaLinkedin/>
                {/* <Input type="text" /> */}
            </div>
            <div className ="w-3/6 px-16 md:mb-0">
                {/* <InputLabel label="LastName" /> */}
                <ImGooglePlus3/>
                {/* <Input type="text" /> */}
            </div>
        </div>
        <h2 className="text-2xl mb-2 text-center">OR</h2>
      <form className="w-full">
        <div className="flex flex-wrap w-full m-auto justify-between">
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="FirstName" />
                <Input type="text" />
            </div>
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="LastName" />
                <Input type="text" />
            </div>
        </div>
        <div className="flex flex-wrap w-full m-auto justify-between">
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Email" />
                <Input type="email" />
            </div>
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Phone Number" />
                <Input type="text" />
            </div>
        </div>
        <div className="flex flex-wrap w-full m-auto justify-between">
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Address" />
                <Input type="text" />
            </div>
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="City" />
                <Input type="text" />
            </div>
        </div>
        <div className="flex flex-wrap w-full m-auto justify-between">
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="State" />
                <Input type="text" />
            </div>
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Postal Code" />
                <Input type="text" />
            </div>
        </div>
        <div className="flex flex-wrap w-full m-auto justify-between">
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Password" />
                <Input type="text" />
            </div>
            <div className ="w-3/6 px-6 md:mb-0">
                <InputLabel label="Confirm Password" />
                <Input type="text" />
            </div>
        </div>
        <div className="flex items-center mb-2 px-6">
        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-700 bg-indigo-100 border-imdigo-300 rounded focus:ring-blue-500 dark:focus:ring-indigo-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
       <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >I agree to all the Terms, Privacy and Fees</label>
        </div>
        
        <div className="flex flex-wrap mb-2 w-full px-6 m-auto">
            <Button btn="Get Started" />
        </div>
        <h2 className="text-sm text-center font-normal">Have an existing account?<a href="/login" className="text-indigo-600 font-semibold">Sign In</a></h2>

     </form>
    </div>
    </div>
  )
}

export default Signup
