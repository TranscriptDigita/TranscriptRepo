import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, reset } from '../../../../features/auth/authSlice';
import { Spinner } from '../../../../components';
import { FaGoogle } from 'react-icons/fa6';
import illustration1 from '../../../../assets/college admission-bro.png';
import illustration2 from '../../../../assets/college project-cuate.png';
import { Button, Divider, TextField } from '@mui/material';

function Login() {
  const [imageSrc, setImageSrc] = useState(illustration1);
  const imageList = [illustration1, illustration2];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const changeImage = () => {
      const currentIndex = imageList.indexOf(imageSrc);
      const nextIndex = (currentIndex + 1) % imageList.length;
      setImageSrc(imageList[nextIndex]);
    };

    const interval = setInterval(changeImage, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [imageSrc, imageList]);

  const [formData, setFormData] = useState({
    emailAddress: '',
    password: '',
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate(`/alumni/${user.alumni._id}/dashboard`);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  const inputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { emailAddress, password } = formData;

    const userData = {
      emailAddress,
      password,
    };

    try {
      const response = await dispatch(login(userData));
      // Store the API response in the state
      console.log('API Response:', response);

      // Check if the response status indicates a successful login
      if (response.status === 200) {
        // Log the data sent to the API
        console.log('Data sent to API:', userData);

        // Add your logic here for handling the successful response
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="grid grid-cols-1 md:w-9/12 m-auto md:grid-cols-2">
        <div className="flex flex-1 md:block hidden gap-y-4">
          <img src={imageSrc} alt="" width={400} />
          <div className="grid grid-cols-3 gap-x-8">
            <div className="p-1 bg-slate-100"></div>
            <div className="p-1 bg-blue-100"></div>
            <div className="p-1 bg-slate-100"></div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:w-8/12 m-auto justify-center w-full gap-y-4 p-3 md:p-0"
        >
          {isLoading ? <Spinner /> : ``}
          <h4 className="font-semibold">Welcome Back !</h4>
          <div className="flex flex-col gap-y-4">
            <TextField
              id="outlined-email-input"
              label="email address"
              type="email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={inputChange}
              required
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              name="password"
              value={formData.password}
              onChange={inputChange}
              required
            />
          </div>

          <div className="text-right text-xs font-light">
            <Link to={`/alumni/reset-password`}>forgot password ?</Link>
          </div>

          <Button
            variant="contained"
            className="bg-[#6B3FA0] hover:bg-[#6B3FA0] lowercase"
            type="submit"
          >
            Sign in
          </Button>

          <Button
            variant="contained"
            className="bg-slate-100 text-slate-900 hover:bg-[#CCCCCC] lowercase"
          >
            <Link to={`/alumni/signup`}>create account</Link>
          </Button>

          <Divider>or continue with</Divider>

          <Button
            variant="contained"
            endIcon={<FaGoogle />}
            className="bg-[#CCCCCC] text-slate-900 lowercase hover:bg-[#CCCCCC]"
          >
            continue with google
          </Button>

          <p className="text-xs text-center">
            by clicking the sign up button you agree to our terms and policies.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
