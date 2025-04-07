import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import logo from './otpimg.png';
import { arr } from './arr'; // Importing the global `arr` object

const OtpVerificationPage = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3500/datasave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          otp,
          Email: arr.Email,
          Name: arr.Name,
          Password: arr.Password,
          ConfirmPassword: arr.ConfirmPassword,
          Age: arr.Age,
          ACcountNO: arr.ACcountNO,
          Amount: arr.Amount,
          AccType: arr.AccType, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP verified successfully! Data saved.');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        setMessage(data.message || 'OTP is incorrect');
      }
    } catch (error) {
      console.error('Error in API call:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="ho">OTP Verification</h2>
      <div className="header">
        <div className="main1">
          <img src={logo} className="imga2" alt="Logo" />
          <div className="head1">
            <h1>Welcome</h1>
            <span>Verify Your OTP</span>
            <label className="label">Enter OTP:</label>
            <div className="head-1">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button onClick={handleSubmit} disabled={loading} className="butt">
              {loading ? 'Verifying...' : 'Submit'}
            </button>
            {message && <p className="validation-message">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
