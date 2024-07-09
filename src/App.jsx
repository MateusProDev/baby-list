import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import GiftList from './components/GiftList';
import Convidados from './components/Convidados';
import styled from 'styled-components';
import './App.css';
import AccountCircle from '@mui/icons-material/AccountCircle';

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nav = styled.nav`
  background-color: #ff6b6b;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
`;

const LoginIcon = styled(AccountCircle)`
  cursor: pointer;
  font-size: 2rem;
  color: #000;
`;

const App = () => {
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário logado

  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Erro ao deslogar:', error);
    });
  };

  return (
    <Router>
      <AppContainer>
        <Nav>
          <Link to="/">
            <Logo>Seu Evento</Logo>
          </Link>
          {user ? (
            <>
              <LoginIcon onClick={handleLogout} />
              <Navigate to="/convidados" replace />
            </>
          ) : (
            <LoginIcon onClick={handleLogin} />
          )}
        </Nav>
        <Routes>
          <Route path="/" element={<GiftList />} />
          <Route path="/convidados" element={<Convidados />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
