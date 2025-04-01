import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './bank-login-concept-illustration.png';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [input, setInput] = useState('');
  const [input1, setInput1] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!input || !input1) {
      setLoginError('Please fill in all details.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: input, password: input1 }),
      });

      const bodyValue = await response.json();

      if (bodyValue.message === 'success') {
        setLoginError('Login successful');

        navigate('/Dashboard', { state: bodyValue.data });
      } else {
        setLoginError('Login failed');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setLoginError('Error: Unable to connect to the server.');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const create = () => {
    navigate('/signin');
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setLoginError('');
  };

  return (
    <>
      <h1 className='ho'>Simple And Safe Bank <span>Account!</span></h1>
      <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' alt="Bank logo" />
          <div className='head1'>
            <h1>Welcome To</h1>
            <span> VSBank Login </span>
            <div className='head-1'>
              <input
                type='text'
                placeholder='User Email'
                onChange={handleInputChange(setInput)}
                value={input}
              />
            </div>
            <div className='head-2'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder='User Password'
                onChange={handleInputChange(setInput1)}
                value={input1}
              />
              <i
                className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            {loginError && <p className='validation-message'>{loginError}</p>}

            <button className='butt' onClick={fetchData}>Login</button>
            <button className='butt1' onClick={create}>Create New Account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
