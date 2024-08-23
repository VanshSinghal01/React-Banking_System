import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './account3.png';
import '@fortawesome/fontawesome-free/css/all.css';
import { arr } from './arr';

function CreateAccount(filteredData) {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [validationMessage, setValidationMessage] = useState('');


  const navigate = useNavigate();

  const handleCreateAccount = () => {
    setValidationMessage('');

    if (!username || !age || !accountNumber || !initialAmount ||! accountType) {
      setValidationMessage('All fields are required.');
      return;
    }

    if (!accountNumber || isNaN(accountNumber.trim())) {
      setValidationMessage('Invalid account number.');
      return;
    }

    if (isNaN(parseFloat(initialAmount)) || parseFloat(initialAmount) < 0) {
      setValidationMessage('Initial amount must be a positive number.');
      return;
    }

    let obj = {
      accountNumber: accountNumber,
      username: username,
      age: age,
      initialAmount: initialAmount,
      Accounttype: accountType
    };

    arr.push(obj);

    navigate('/Dashboard');
  };


  return (
    <>
      <h1 className='ho'>Create Your <span>New</span> Account!</h1>
      <div className='header'>
        <div className='main1'>
          <img src={logo} className='imga1' alt="Logo" />
          <div className='heado1'>
            <h1>Welcome</h1>
            <span>Create a new account</span>

            <div className='head-1'>
              <input
                type='text'
                placeholder='UserName'
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>

            <div className='head-2'>
              <input
                type='text'
                placeholder='Age'
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
            <div className='head-2'>
              <input
                type='text'
                placeholder='Account Number'
                onChange={(e) => setAccountNumber(e.target.value)}
                value={accountNumber}
              />
            </div>

            <div className='head-2'>
              <input
                type='text'
                placeholder='Initial Amount'
                onChange={(e) => setInitialAmount(e.target.value)}
                value={initialAmount}
              />
            </div>

            <div className='head-2'>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value='Choose Your Account Type'>Choose Your Account Type</option>
                <option value='Saving Account'>Saving Account</option>
                <option value='Current Account'>Current Account</option>
                <option value='Salary Account'>Salary Account</option>
              </select>
            </div>

            {validationMessage && <p className='validation-message'>{validationMessage}</p>}

            <button className='butt' onClick={handleCreateAccount}>Create Account</button>
            <button className='butt1' onClick={() => navigate('/Dashboard')}>Back to Dashboard</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
