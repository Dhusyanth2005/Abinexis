import React, { useState } from 'react';


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Logged In!');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signed Up!');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <input type="text" placeholder="Username" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {!isLogin && (
            <input type="password" placeholder="Confirm Password" required />
          )}
          <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p onClick={toggleForm} className="toggle-link">
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
