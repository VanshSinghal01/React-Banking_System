import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Dashboard from './dashboard.jsx';
import Deposite from './Deposite.jsx';
import Sign from './signin.jsx'
import OtpVerificationPage from './Otppage.jsx';
import Withdraw from './Withdraw.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

let data= createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/Dashboard',
    element:<Dashboard/>
  },
  {
    path:'/signin',
    element:<Sign/>
  },
  {
    path:'/Deposite',
    element:<Deposite/>
  },
  {
    path:'/Withdraw',
    element:<Withdraw/>
  },{
    path:'/OtpVerificationPage',
    element:<OtpVerificationPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
 <RouterProvider router={data}>
  <App/>
 </RouterProvider>
)
