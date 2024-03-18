// PasswordPage.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Password.css'

const PasswordPage = ({ setPasswordCorrect } :any) => {
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const pwd = 'delivery';

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (password === pwd) {
      localStorage.setItem('authenticated', 'true');
      setPasswordCorrect(true);
      setRedirect(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h2>Entrer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button className='submit' type="submit">Submit</button>
      </form>
    </div>

  );
};

export default PasswordPage;
