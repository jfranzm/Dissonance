import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LineIcon from "react-lineicons";

// Components
import AuthPage from '../AuthPage/AuthPage';
import MainHubPage from '../MainHubPage/MainHubPage';
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
              {/* Route components in here */}
              <Route path="/" element={<MainHubPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
