// Compoenents
import './AuthPage.css'
import { useState } from 'react';
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import FullLogo from '../../components/FullLogo/FullLogo';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <main className="AuthPage">
      <FullLogo />
      <div className='overlay-container'>
        <div className='overlay'>
          {showLogin ? 
            <div className='overlay-panel overlay-left'>
              <h1 className='title'>Welcome back</h1>
              <p>If you already have an account, login here and have fun</p></div>: 
            <div className='overlay-panel overlay-right'>
              <h1 className='title'>Join the fun now</h1>
              <p>If you don't have an account yet, register here and join the party</p>
            </div>
          }
        <button className='switch-btn' onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</button>
        </div>
      </div>
      {showLogin ? <LoginForm className="form-container"setUser={setUser} /> : <SignUpForm className="form-container"setUser={setUser} />}
    </main>
  );
}