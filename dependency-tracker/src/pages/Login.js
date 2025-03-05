import React, { useState } from "react";
import './Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

    return (
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" 
            id="email"
            placeholder="Enter your email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
            id="password"
            placeholder="Enter your password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className="login-button-container">
              <button type="submit" className="login-button">login</button>
          </div>

          <a className="signup-link" href="/signup">Sign Up</a>
        </form>
      </div>
    );
}

export default Login;