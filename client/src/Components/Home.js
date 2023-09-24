import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const [loginHistory, setLoginHistory] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/get-data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoginHistory(response.data.loginHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('http://localhost:8001/logout', { email: userData.email });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  // Start the automatic logout timer when the component moun
  const expirationTime = 300000;
  const [logoutTimer, setLogoutTimer] = useState(null);

  useEffect(() => {
    if (token) {
      // User is logged in, start the logout timer
      const timer = setTimeout(() => {
        // Automatically log out the user after 5 minutes
        logout();
        localStorage.removeItem('token');
      }, expirationTime);

      setLogoutTimer(timer);
    } else {
      // Clear the logout timer if the user is not logged in
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }

    // Clean up the timer when the component unmounts
    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [token, logoutTimer, expirationTime]);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const postMessage = async () => {
    try {
      await axios.post(
        'http://localhost:8001/post-messages',
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetchData();
  })

  return (
    <div className="home-container">
      <div className="header">
        <h2>Welcome, {userData.name}!</h2>
      </div>
      <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="message-box">
        <textarea
          placeholder="Write your message (at least 100 words)..."
          value={message}
          onChange={handleInputChange}
        />
        <button onClick={postMessage}>Submit</button>
      </div>
      <div className="previous-activity">
      <h3> Messages</h3>
      <table>
        <thead>
          <tr>
          <th>Messages</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>
          <ul>
            {userData?.messages?.map((message, msgIndex) => (
            <li key={msgIndex} style={{ textAlign: 'left' }}>{message}</li>
            ))}
          </ul>
        </td>
          </tr>
        </tbody>
      </table>
      <br/>
        <h3>Your Previous Activity:</h3>
        <table>
          <thead>
            <tr>
              <th>Login Timestamp</th>
              <th>Session Duration (in seconds)</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.timestamp}</td>
                <td>{entry.sessionDuration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
