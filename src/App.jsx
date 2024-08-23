import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css'
import { Link, Navigate } from 'react-router-dom'
import logo from './bank-login-concept-illustration.png'
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [input, setinput] = useState('');
  const [input1, setinput1] = useState('');
  const [required, setrequired] = useState(false)
  const [password, setpassword] = useState(false)
  const [popup, setpopup] = useState(false)
  const navigate = useNavigate();

  const submit = () => {
    if (input === 'Vansh01' && input1 === 'vansh@123') {
      navigate('/Dashboard'); 
    }
    else {
      setrequired(true);
    }
    if (input !== '' && input1 !== '' && input !== 'vansh01' && input1 !== 'vansh@123') {
      setpopup(true);
      setrequired(false);
    } else {
      setpopup(false);
    }
  }
  const visible=()=>{
    setpassword(!password);
  }

  // const create=()=>{
  //   navigate('/signin')
  // }

  return (
    <>
      <h1 className='ho'>Simple And Safe Bank <span>Account!</span></h1>

      { popup  && <div className='pop'>
        <p>Your Password and User ID is Invalid....</p>
      </div>
      }
      <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' />
          <div className='head1'>
            <h1>Welcom To</h1>
            <span> VSBank Login </span>
            <div className='head-1'>
              <input type='text'
                placeholder='User Name'
                onChange={(e) => setinput(e.target.value)}
                value={input} />
                {required && input === '' && <p>Enter user name</p>}
              {required && input !== ''  && input !== 'Vansh01' && 
                <p>Invalid User Name</p>
              }
            
            </div>
            <div className='head-2'>
              <input type={password ? 'text':'password'}
                placeholder='User Password'
                onChange={(e) => setinput1(e.target.value)}
                value={input1} />
                <i  className={`fa ${password ? 'fa-eye' : 'fa-eye-slash'}`} aria-hidden="true" onClick={visible}></i>
                {required && input === '' && <p>Enter user Password</p>}
              {required && input !== ''  && input1 !== 'vansh@123' &&
                <p>Invalid User Password</p>
              }
            </div>
            <div className='check'>
              <input type="checkbox" />
              <p>Remember Me</p>
            </div>
            <button className='butt' onClick={submit} ><Link className='li'>Login</Link></button>
            {/* <button className='butt1' onClick={create}>Create New Account</button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
