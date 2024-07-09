import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, signOutFromGoogle } from '../../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const LoginButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3367d6;
  }
`;

const LogoutButton = styled.button`
  background-color: #db4437;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c13526;
  }
`;

const Greeting = styled.p`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Login = ({ onLogin }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      onLogin(currentUser);
    });

    return () => unsubscribe();
  }, [onLogin]);

  const handleSignIn = () => {
    signInWithGoogle();
  };

  const handleSignOut = () => {
    signOutFromGoogle();
  };

  return (
    <LoginContainer>
      {user ? (
        <>
          <Greeting>Olá, {user.displayName}!</Greeting>
          <LogoutButton onClick={handleSignOut}>Sair</LogoutButton>
        </>
      ) : (
        <LoginButton onClick={handleSignIn}>Entrar com Google</LoginButton>
      )}
    </LoginContainer>
  );
};

export default Login;
