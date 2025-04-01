import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './account3.png';
import { arr } from './arr';
import '@fortawesome/fontawesome-free/css/all.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    setValidationMessage('');

    // Validation checks
    if (!username || !age || !initialAmount || !accountType || !email || !password || !confirmPassword) {
      setValidationMessage('All fields are required.');
      return;
    }

    if (isNaN(parseFloat(initialAmount)) || parseFloat(initialAmount) < 0) {
      setValidationMessage('Initial amount must be a positive number.');
      return;
    }

    if (password !== confirmPassword) {
      setValidationMessage('Passwords do not match.');
      return;
    }

    const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generate random 10-digit account number

    const obj = {
      Name: username,
      Age: age,
      Amount: initialAmount,
      AccType: accountType,
      Email: email,
      Password: password,
      ConfirmPassword: confirmPassword,
      ACcountNO: accountNumber,
    };

    // Temporarily store data in the `arr` object
    arr.Name = username;
    arr.Age = age;
    arr.Amount = initialAmount;
    arr.AccType = accountType;
    arr.Email = email;
    arr.Password = password;
    arr.ConfirmPassword = confirmPassword;
    arr.ACcountNO = accountNumber;

    console.log('Data stored in arr:', arr);

    // Send data to the backend
    fetch('http://localhost:3500/emailsend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Error creating account.');
        }

        setValidationMessage(
          `Account created successfully! Your account number is ${data.accountNumber}. Please check your email for the OTP.`
        );

        // Navigate after showing the success message
        setTimeout(() => {
          navigate('/OtpVerificationPage');
        }, 2000);
      })
      .catch((error) => {
        console.error('Error creating account:', error);
        setValidationMessage(error.message || 'Error creating account. Please try again.');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h1 className="ho">Create Your <span>New</span> Account!</h1>
      <div className="header">
        <div className="main1">
          <img src={logo} className="imga1" alt="Logo" />
          <div className="heado1">
            <h1>Welcome</h1>
            <span>Create a new account</span>

            <div className="head-1">
              <input
                type="text"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="head-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <i
                className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                aria-hidden="true"
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="head-2">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <div className="head-2">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="head-2">
              <input
                type="text"
                placeholder="Age"
                onChange={(e) => setAge(e.target.value)}
                value={age}
              />
            </div>
            <div className="head-2">
              <input
                type="text"
                placeholder="Initial Amount"
                onChange={(e) => setInitialAmount(e.target.value)}
                value={initialAmount}
              />
            </div>
            <div className="head-2">
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Choose Your Account Type</option>
                <option value="Saving Account">Saving Account</option>
                <option value="Current Account">Current Account</option>
                <option value="Salary Account">Salary Account</option>
              </select>
            </div>

            {validationMessage && <p className="validation-message">{validationMessage}</p>}

            <button className="butt" onClick={handleCreateAccount}>Create Account</button>
            <button className="butt1" onClick={() => navigate('/')}>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
