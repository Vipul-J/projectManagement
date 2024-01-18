import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import navlogo from "../assets/logoOne.png";
import backgroundImg from "../assets/bgImg2.jpeg"; // Import your background image

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      if (username === 'sathvik' && password === 'sassysat') {
        // Consider the login successful
        setError('');
        console.log('Login successful!');
        navigate('/projectOne');

      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', height: '100vh', width: '100%' }}>
      <div className="card mx-auto" style={{ maxWidth: '100%', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <div className="card-body p-4">
          <div className='d-flex justify-content-center align-items-center mt-3 mb-3'>
            <img src={navlogo} height="70" className='p-2' alt="Logo" />
          </div>

          <h2 className="card-title text-center mb-4">Login</h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
