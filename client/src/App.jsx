// rrd imports
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom'

// react-toastify imports
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// mui imports
import { StyledEngineProvider } from '@mui/material'

// layout imports
import { AlumniLayout, InstitutionLayout, Main } from './layouts'

// pages imports
<<<<<<< HEAD
import { Login, InstitutionLogin, InstitutionSignup, InstitutionDashboard, ErrorPage, ForgotPassword, ChangePassword, AlumniDashboard, LandingPage, AlumniSignup, AlumniVerification, AlumniResetPassword, NewTranscriptRequestPage, TranscriptTrackingPage, LogoutPage, TranscriptDetailPage, RequestTrackAndDelivery } from './pages'

// components imports
import { SelectLogin, TranscriptGridItem, TranscriptDataItem, Progress } from './components'

// redux imports
import { useSelector } from 'react-redux';
import TranscriptDetail from './pages/Alumni/Transcripts/TranscriptDetail/TranscriptDetail'
import NewRequestPage from './pages/Alumni/Transcripts/NewRequestPage/NewRequestPage'
=======
import { Login, InstitutionLogin, InstitutionSignup, InstitutionDashboard, ErrorPage, ForgotPassword, ChangePassword, AlumniDashboard, LandingPage, AlumniSignup, AlumniVerification, AlumniResetPassword, NewTranscriptRequestPage, TranscriptTrackingPage, LogoutPage, TranscriptDetailPage } from './pages'

// components imports
import { SelectLogin } from './components'

// redux imports
import { useSelector } from 'react-redux';
>>>>>>> origin/godwin

function App() {

  const { user } = useSelector((state) => state.auth)

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Main/>,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
<<<<<<< HEAD
          element: <AlumniLayout/>,
=======
          element: <LandingPage/>,
>>>>>>> origin/godwin
        },
        {
          path: '/selectlogin',
          element: <SelectLogin/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/logout',
          element: <LogoutPage/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/signup',
          element: <AlumniSignup/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/login',
          element: <Login/>,
          errorElement: <ErrorPage/>
        },
        
        {
          path: '/alumni/:id/verify',
          element: user ? <AlumniVerification/> : <Navigate to={`/alumni/login`} />,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/reset-password',
          element: <ForgotPassword />,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/reset-password/:token',
          element: <AlumniResetPassword/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/institution/signup',
          element: <InstitutionSignup/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/institution/login',
          element: <InstitutionLogin/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/institution',
          element: <InstitutionLayout/>,
          errorElement: <ErrorPage/>,
          children:[
            {
              path: '/institution/:id/dashboard',
              element: <InstitutionDashboard/>,
              errorElement: <ErrorPage/>
            },
    
          ]
        },
      ]
    },

    {
      path: '/alumni',
<<<<<<< HEAD
      // replace with "user ? <AlumniLayout/> : <Navigate to={`/alumni/login`} />" to use user to load page
      element: <AlumniLayout/>,
=======
      element: user ? <AlumniLayout/> : <Navigate to={`/alumni/login`} /> ,
>>>>>>> origin/godwin
      errorElement: <ErrorPage/>,
      children: [

        {
          path: '/alumni/:id/dashboard',
<<<<<<< HEAD
           // replace with "user ? <AlumniDashboard/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element:  <AlumniDashboard/>,
=======
          element: user ? <AlumniDashboard/> : <Navigate to={`/alumni/login`} />,
>>>>>>> origin/godwin
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/change-password',
<<<<<<< HEAD
           // replace with "user ? <ChangePassword/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <ChangePassword />,
=======
          element: user ? <ChangePassword /> : <Navigate to={`/alumni/login`} />,
>>>>>>> origin/godwin
          errorElement: <ErrorPage/>
        },
        {
          path: '/alumni/:id/transcripts/',
<<<<<<< HEAD
           // replace with "user ? <TranscripteTrackingPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <TranscriptTrackingPage/>,
=======
          element: user ? <TranscriptTrackingPage/> : <Navigate to={`/alumni/login`} />,
>>>>>>> origin/godwin
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/transcripts/:id',
<<<<<<< HEAD
           // replace with "user ? <TranscriptDetailPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <TranscriptDetailPage/>,
=======
          element: user ? <TranscriptDetailPage/> : <Navigate to={`/alumni/login`} />,
>>>>>>> origin/godwin
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/transcripts/new',
<<<<<<< HEAD
           // replace with "user ? <NewTranscriptRequestPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <NewTranscriptRequestPage/>,
          errorElement: <ErrorPage/>
        },


        {
          path: '/alumni/:id/requesttrackanddelivery',
           // replace with "user ? <RequestTrackAndDelivery/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <RequestTrackAndDelivery/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/progress',
          element: <Progress/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/transcripts/newrequest',
           // replace with "user ? <NewTranscriptRequestPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <NewRequestPage/>,
          errorElement: <ErrorPage/>
        },

        

=======
          element: user ? <NewTranscriptRequestPage/> : <Navigate to={`/alumni/login`} />,
          errorElement: <ErrorPage/>
        },
>>>>>>> origin/godwin
      ]  

    }

  ])

  return (
    <div>
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
        <ToastContainer/>
      </StyledEngineProvider>
    </div>
  )
}

export default App
