import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import Sign from "./signin";
import logo from './vlogo1.png';
import { arr } from './arr';
import '@fortawesome/fontawesome-free/css/all.css';
import Deposite from './Deposite';

const Dashboard = () => {
  const [accountData, setAccountData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentDate, setCurrentDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setAccountData(arr);
    setFilteredData(arr);

    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const hsearch = (e) => {
    const choice = e.target.value;
    if (choice === 'All') {
      setFilteredData(accountData);
    } else {
      const result = accountData.filter(item => item.Accounttype === choice);
      setFilteredData(result);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const result = accountData.filter(item => 
      item.username.toLowerCase().includes(value)
    );
    setFilteredData(result);
  };

  return (
    <div className='main'>
      <input 
        type='text' 
        placeholder='Search...' 
        className='input' 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <i className="fa fa-search cir" aria-hidden="true"></i>
      <div className='Top-bar'>
        <div>
          <div className='top1'>
            <h1>Welcome Back,</h1>
            <p>You last logged in {currentDate}</p>
          </div>
        </div>
        <div className='top-bu'>
          <button className='top-but'><Link to='/signin' className='but'>Account</Link></button>
          <button className='top-but1'><Link to='/Deposite' className='but'>Deposit</Link></button>
          <button className='top-but1'><Link to='/Withdraw' className='but'>Withdraw</Link></button>
        </div>
      </div>
      <div className='content'>
        <h1>Account Information:</h1>
      </div>
      <div className='sidebar'>
        <img src={logo} className='im'/>
        <div className='sidebar-1'>
          <button onClick={hsearch} value='All' className='top-but3'>All</button>
          <button onClick={hsearch} value='Saving Account' className='top-but2'>Saving Account</button>
          <button onClick={hsearch} value='Salary Account' className='top-but2'>Salary Account</button>
          <button onClick={hsearch} value='Current Account' className='top-but2'>Current Account</button>
        </div>
      </div>
      <div className='box-container'>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className='box'>
              <h1>Name: {item.username}</h1>
              <h2>Age: {item.age}</h2>
              <p>Account Number: {item.accountNumber}</p>
              <p>Initial Amount: {item.initialAmount}</p>
              <span>Account Type: {item.Accounttype}</span>
            </div>
          ))
        ) : (
          <p>No account data available</p>
        )}
      </div>
      {<Sign filteredData={filteredData} />}
    </div>
  );
};

export default Dashboard;
