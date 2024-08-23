import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './account3.png';
import '@fortawesome/fontawesome-free/css/all.css';
import { arr } from './arr';

const Withdraw = () => {
  const [account1, setAccount1] = useState(''); 
  const [initial, setInitial] = useState('');
  const [validationMessage, setValidationMessage] = useState('');

  const navigate = useNavigate();

  const money = () => {
    setValidationMessage('');

    if (!account1 || !initial) {
      setValidationMessage('All fields are required.');
      return;
    }

    const acc1 = arr.find(acc => acc.accountNumber === account1);


    if (!acc1) {
      setValidationMessage('Invalid account number.');
      return;
    }

    acc1.initialAmount =parseInt(acc1.initialAmount)-parseInt(initial);

    setValidationMessage('Successful!');

    setAccount1('');
    setInitial('');

    navigate('/Dashboard');
  };

  return (
    <div>
      <h1 className='ho'>Create Your <span>New</span> Account!</h1>
      <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' alt="Logo" />
          <div className='heado1'>
            <h1>Welcome</h1>
            <span>Send Money to BFF</span>

            <div className='head-1'>
              <input
                type='text'
                placeholder='Account Number'
                onChange={(e) => setAccount1(e.target.value)}
                value={account1}
              />
            </div>

            <div className='head-2'>
              <input
                type='text'
                placeholder='Amount'
                onChange={(e) => setInitial(e.target.value)}
                value={initial}
              />
            </div>

            {validationMessage && <p className='validation-message'>{validationMessage}</p>}

            <button className='butt' onClick={money}>Withdraw</button>
            <button className='butt1' onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;
