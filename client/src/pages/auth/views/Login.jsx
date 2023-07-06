import LoginImg from "../../../assets/loginImg.jpg"
import Input from "../../../components/Input"
import Button from "../../../components/Button"

const Login = () => {
  return (
    <div className="flex justify-center align-center h-screen w-full">
        <div className="flex-1 w-full">
          <img src={LoginImg} className="object-cover"/>
        </div>
        <div className="flex-1 bg-gray-100 w-full">
          <div className="flex flex-col w-4/6 m-auto justify-center">
            <h2 className="text-3xl mb-2 text-indigo-700 text-center">Welcome</h2>

            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="Sign In with LinkedIn" />
            </div>
            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="Sign In with Google"/>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-600 text-center">OR</h2>
          <form action="" method="post" className="w-4/6 m-auto">
            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="Email" />
            </div>
            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="password"/>
            </div>
            <div className ="w-full  md:mb-0">
                <Button btn="Sign In" />
            </div>
            <div className="flex justify-between mb-6">
              <div className="">
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-700 bg-indigo-100 border-imdigo-300 rounded focus:ring-blue-500 dark:focus:ring-indigo-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Remember me</label>
              </div>
              <div>
                <a href="/" className="text-xs font-semibold">Forgot password?</a>
              </div>
            </div>
            <h2 className="text-center">Not a Member? <a href="/signup" className="text-indigo-700">Join Now</a></h2>
          </form>
        </div>
    </div>
  )
}

export default Login
