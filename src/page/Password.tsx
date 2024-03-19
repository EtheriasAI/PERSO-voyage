// PasswordPage.js
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Password.css'

const PasswordPage = ({ setPasswordCorrect } :any) => {
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const pwd = 'fatuhiva';

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
    <div className='password'>
      <div className='modal'>
        <h2>Entrer le mot de passe</h2>        
        <input className='mdp'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
        />
        <button className='submit' onClick={handleSubmit} type="submit">Submit</button>  
      </div>
    </div>

  );
};

export default PasswordPage;
