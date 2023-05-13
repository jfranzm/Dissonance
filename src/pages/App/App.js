import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import AuthPage from '../AuthPage/AuthPage';
import MainHubPage from '../MainHubPage/MainHubPage';
import DirectMessages from '../DirectMessages/DirectMessages';
import NavBar from '../../components/NavBar/NavBar';

// Helpers
import { getUser } from '../../utilities/services/users';

import './App.css';

export default function App() {
  const [user, setUser] = useState(getUser());
  return (
    <main className="App">
      { user ?
          <>
          <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<MainHubPage user={user}/>} />
              <Route path="/directmessage" element={<DirectMessages user={user}/>}/>
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
