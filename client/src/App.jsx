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
import { AlumniLayout, EvaluationLayout, InstitutionLayout, Main } from './layouts'

// pages imports
import { Login, InstitutionLogin, InstitutionSignup, InstitutionDashboard, ErrorPage, ForgotPassword, ChangePassword, AlumniDashboard, LandingPage, AlumniSignup, AlumniVerification, AlumniResetPassword, NewTranscriptRequestPage, TranscriptTrackingPage, LogoutPage, TranscriptDetailPage, RequestTrackAndDelivery, RegistraDashboard, EvaluationOfficerLogin, EvaluationOfficerDashboard, VerifyCertificate, InstitutionVerification } from './pages'

// components imports
import { SelectLogin, TranscriptGridItem, TranscriptDataItem, Progress } from './components'

// redux imports
import { useSelector } from 'react-redux';
import TranscriptDetail from './pages/Alumni/Transcripts/TranscriptDetail/TranscriptDetail'
import NewRequestPage from './pages/Alumni/Transcripts/NewRequestPage/NewRequestPage'
import RegistraLayout from './layouts/registraLayout/RegistraLayout'

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
          element: <LandingPage/>,
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
          path: '/institution/:id/verify',
          element: user ? <InstitutionVerification/> : <Navigate to={`/institution/login`} />,
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
          path: '/evaluationofficer/login',
          element: <EvaluationOfficerLogin/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/verifycertificate',
          element: <VerifyCertificate/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/evaluationofficer',
          element: <EvaluationLayout/>,
          errorElement: <ErrorPage/>,
          children: [
            {
              path: '/evaluationofficer/:id/dashboard',
              element: <EvaluationOfficerDashboard/>,
              errorElement: <ErrorPage/>
            },

            // {
            //   path: '/institution/id:/requestlist',
            //   element: <RequestList/>,
            //   errorElement: <ErrorPage/>
            // }
          ]
         
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


            {
              path:'/institution/:id/stafflist',
              element: <RegistraDashboard/>,
              errorElement: <ErrorPage/>
            },

            // {
            //   path: '/institution/id:/requestlist',
            //   element: <RequestList/>,
            //   errorElement: <ErrorPage/>
            // }
          ]
        },

        {
          path: '/registra',
          element: <RegistraLayout/>,
          errorElement: <ErrorPage/>,
          children:[
            {
              path: '/registra/:id/dashboard',
              element: <RegistraDashboard/>,
              errorElement: <ErrorPage/>
            },

            // {
            //   path: '/institution/id:/requestlist',
            //   element: <RequestList/>,
            //   errorElement: <ErrorPage/>
            // }
          ]
        },

       

       
      ]
    },

    {
      path: '/alumni',
      // replace with "user ? <AlumniLayout/> : <Navigate to={`/alumni/login`} />" to use user to load page
      element: <AlumniLayout/>,
      errorElement: <ErrorPage/>,
      children: [

        {
          path: '/alumni/:id/dashboard',
           // replace with "user ? <AlumniDashboard/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element:  <AlumniDashboard/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/change-password',
           // replace with "user ? <ChangePassword/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <ChangePassword />,
          errorElement: <ErrorPage/>
        },
        {
          path: '/alumni/:id/transcripts/',
           // replace with "user ? <TranscripteTrackingPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <TranscriptTrackingPage/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/transcripts/:id',
           // replace with "user ? <TranscriptDetailPage/> : <Navigate to={`/alumni/login`} />" to use user to load page
          element: <TranscriptDetailPage/>,
          errorElement: <ErrorPage/>
        },

        {
          path: '/alumni/:id/transcripts/new',
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
      ]  

    },

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
