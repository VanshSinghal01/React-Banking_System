import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const userData = location.state;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3500/'); 
        const data = await response.json();
        setAccountData(data);
        const userAccounts = data.filter(account => account.Email.toLowerCase() === userData.email.toLowerCase());
        setFilteredData(userAccounts);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchData();
    const today = new Date();
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, [userData]); 

  const handleFilter = (e) => {
    const accountType = e.target.value;
    if (accountType === 'All') {
      setFilteredData(accountData);
    } else {
      const result = accountData.filter(account => account.AccType === accountType);
      setFilteredData(result);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const result = accountData.filter(account =>
      account.ACcountNO.toLowerCase().includes(value) ||
      account.Name.toLowerCase().includes(value)
    );

    setFilteredData(result);
  };

  return (
    <div className='main'>
      <input
        type='text'
        placeholder='Search by Account Number or Name...'
        className='input'
        value={searchTerm}
        onChange={handleSearch}
      />
      <i className="fa fa-search cir" aria-hidden="true"></i>

      <div className='Top-bar'>
        <div>
          <div className='top1'>
            <h1>Welcome Back, {userData?.name}</h1>
            <p>You last logged in on {currentDate}</p>
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
        <img src={logo} className='im' />
        <div className='sidebar-1'>
          <button onClick={handleFilter} value='All' className='top-but3'>All</button>
          <button onClick={handleFilter} value='Saving Account' className='top-but2'>Saving Account</button>
          <button onClick={handleFilter} value='Salary Account' className='top-but2'>Salary Account</button>
          <button onClick={handleFilter} value='Current Account' className='top-but2'>Current Account</button>
        </div>
      </div>

      <div className='box-container'>
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className='box'>
              <h1>Name: {item.Name}</h1>
              <h2>Age: {item.Age}</h2>
              <p>Email:{item.Email}</p>
              <p>Account Number: {item.ACcountNO}</p>
              <p>Initial Amount: {item.Amount}</p>
              <span>Account Type: {item.AccType}</span>
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
