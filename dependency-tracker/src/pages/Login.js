import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import '../App.css';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
      });

      if (!response.ok)
      {
        const result = await response.json();
        throw new Error(result.error);
      }

      if (response.status == 200)
      {
        const user = await response.json()
        localStorage.setItem('userId', JSON.stringify(user.userId))
        navigate('/dependencies')
      }

    }
    catch (error) {}
  }

    return (
      <div className="login-root">
        <div className="login-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-button-container">
              <button className="btn" type="submit">
                login
              </button>
            </div>

            <a className="signup-link" href="/signup">
              Sign Up
            </a>
          </form>
        </div>
      </div>
    );
}

export default Login;