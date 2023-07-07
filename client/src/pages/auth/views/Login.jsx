/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../../features/auth/authSlice'
import LoginImg from "../../../assets/loginImg.jpg"
import Input from "../../../components/form/Input"
import Button from "../../../components/form/Button"
import { FaLinkedin } from "react-icons/fa"
import { ImGooglePlus3 } from "react-icons/im"

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  return (
    <div className="flex justify-center align-center h-screen w-full ">
        <div className="flex-1 w-full">
          <img src={LoginImg} className="object-cover"/>
        </div>
        <div className="flex-1 bg-gray-100 w-full py-10">
          <div className="flex flex-col w-4/6 m-auto justify-center">
            <h2 className="text-3xl mb-2 text-indigo-700 text-center">Welcome</h2>
            <div className="flex flex-col w-full mb-4">
              <div className ="w-full mb-2">
                  <a href="" className="w-full border rounded bg-gray-50 border-indigo-300 p-1 flex flex-row items-baseline justify-center m-auto border-b-4 border-r-2 border-l-2">
                      <FaLinkedin className="text-indigo-700 text-xl"/>
                      <p className="px-2">Sign In with LinkedIn</p>
                  </a>
              </div>
              <div className ="w-full md:mb-0">
                  <a className="w-full rounded border border-indigo-300 p-1 flex flex-row items-baseline justify-center m-auto bg-gray-50 border-b-4 border-r-2 border-l-2">
                      <ImGooglePlus3 className="text-indigo-700 text-xl"/>
                      <p className="px-2">Sign In with Google</p>
                  </a>
              </div>
        </div>
          </div>
          <h2 className="text-xl font-bold my-4 text-indigo-700 text-center">OR</h2>
          <form onSubmit={onSubmit} className="w-4/6 m-auto">
            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="Email" name ="email" id ="email" onChange={onChange}/>
            </div>
            <div className ="w-full  md:mb-0">
                <Input type="text" placeholder="password" name ="password" id ="password" onChange={onChange}/>
            </div>
            <div className ="w-full  md:mb-0">
                <Button btn="Sign In" />
            </div>
            <div className="flex justify-between my-3">
              <div className="">
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-indigo-700 bg-indigo-100 border-imdigo-300 rounded focus:ring-blue-500 dark:focus:ring-indigo-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Remember me</label>
              </div>
              <div>
                <a href="/" className="text-xs text-pink-600 font-semibold">Forgot password?</a>
              </div>
            </div>
            <h2 className="text-center mt-10 text-sm">Not a Member? <a href="/signup" className="text-indigo-700">Join Now</a></h2>
          </form>
        </div>
    </div>
  )
}

export default Login
