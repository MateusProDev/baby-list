// src/components/Convidados.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebase'; // Importando auth aqui
import { onAuthStateChanged } from 'firebase/auth';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  color: #4a4a4a;
  margin-bottom: 20px;
`;

const SearchBar = styled.input`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 10px;
  width: 300px;
`;

const ChosenGiftList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ChosenGiftItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 200px;
`;

const GiftImage = styled.img`
  border-radius: 10px;
  height: 150px;
  object-fit: cover;
  width: 100%;
`;

const GiftName = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: #4a4a4a;
`;

const ChosenBy = styled.p`
  font-family: 'Poppins', sans-serif;
  color: #6c757d;
`;

const Convidados = () => {
  const [gifts, setGifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchGifts = async () => {
      const giftsCollection = collection(db, 'gifts');
      const giftSnapshot = await getDocs(giftsCollection);
      const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGifts(giftList);
    };

    fetchGifts();
  }, []);

  const filteredGifts = gifts.filter(gift =>
    gift.chosenBy && gift.chosenBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>Presentes Escolhidos</Title>
      <SearchBar
        type="text"
        placeholder="Pesquisar por nome do convidado"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {user ? (
        <ChosenGiftList>
          {filteredGifts.map(gift => (
            <ChosenGiftItem key={gift.id}>
              <GiftImage src={gift.image} alt={gift.name} />
              <GiftName>{gift.name}</GiftName>
              <ChosenBy>Escolhido por: {gift.chosenBy}</ChosenBy>
            </ChosenGiftItem>
          ))}
        </ChosenGiftList>
      ) : (
        <p>Você precisa estar autenticado para ver os presentes escolhidos.</p>
      )}
    </Container>
  );
};

export default Convidados;
