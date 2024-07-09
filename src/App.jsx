import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import GiftList from './components/GiftList';
import Convidados from './components/Convidados';
import styled from 'styled-components';
import './App.css';

// Importe o ícone de login específico que deseja usar
import AccountCircle from '@mui/icons-material/AccountCircle'; // Exemplo de ícone de login do Material Icons

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

  ul {
    list-style: none;
    display: flex;
    gap: 20px;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
      display: none; /* Esconde os links quando o menu está recolhido */
    }
  }

  li {
    a {
      color: #000;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
      &:hover {
        color: #ffd1d1;
      }
    }
  }
`;

const MenuIcon = styled.div`
  cursor: pointer;
  display: none; /* Inicia oculto em telas maiores */

  @media (max-width: 768px) {
    display: block; /* Mostra o ícone de menu em telas menores */
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: #ff6b6b;
  padding: 10px;
  border-radius: 10px;
  display: none;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'block' : 'none')};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
    text-align: center;
  }

  a {
    color: #000;
    text-decoration: none;
    font-weight: bold;
    font-size: 18px;
    &:hover {
      color: #ffd1d1;
    }
  }
`;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário logado

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

  return (
    <Router>
      <AppContainer>
        <Nav>
          <h1>Seu Evento</h1>
          <MenuIcon onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zM3 13h18v-2H3v2zM3 6v2h18V6H3z" />
            </svg>
          </MenuIcon>
          <ul>
            <li><Link to="/">Lista de Presentes</Link></li>
            {user ? (
              <li><Link to="/convidados">Presentes Escolhidos</Link></li>
            ) : (
              <li><AccountCircle onClick={handleLogin} style={{ cursor: 'pointer', fontSize: '2rem' }} /></li>
            )}
          </ul>
          <Menu open={menuOpen}>
            <ul>
              <li><Link to="/" onClick={toggleMenu}>Lista de Presentes</Link></li>
              {user ? (
                <li><Link to="/convidados" onClick={toggleMenu}>Presentes Escolhidos</Link></li>
              ) : (
                <li><AccountCircle onClick={() => { handleLogin(); toggleMenu(); }} style={{ cursor: 'pointer', fontSize: '2rem' }} /></li>
              )}
            </ul>
          </Menu>
        </Nav>
        <Routes>
          <Route path="/" element={<GiftList />} />
          {user ? (
            <Route path="/convidados" element={<Convidados />} />
          ) : (
            <Route path="/convidados" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
