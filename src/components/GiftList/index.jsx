import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import styled from 'styled-components';
import GiftItem from '../GiftItem';
import './index.css';

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

const GiftListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const GiftList = () => {
  const [availableGifts, setAvailableGifts] = useState([]);
  const [chosenGifts, setChosenGifts] = useState([]);

  useEffect(() => {
    const fetchGifts = async () => {
      const giftsCollection = collection(db, 'gifts');
      const giftSnapshot = await getDocs(giftsCollection);
      const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableGifts(giftList);
    };

    fetchGifts();
  }, []);

  const handleChooseGift = async (id, guestName) => {
    const giftDoc = doc(db, 'gifts', id);
    await updateDoc(giftDoc, { chosenBy: guestName }); // Atualiza o documento do presente com o nome do convidado

    // Encontra o presente escolhido na lista de disponíveis e move para a lista de escolhidos
    const chosenGift = availableGifts.find(gift => gift.id === id);
    setChosenGifts(prevChosenGifts => [...prevChosenGifts, chosenGift]);
    setAvailableGifts(prevAvailableGifts => prevAvailableGifts.filter(gift => gift.id !== id));
  };

  return (
    <Container>
      <Title>Lista de Presentes</Title>
      <GiftListWrapper>
        {availableGifts.map(gift => (
          <GiftItem key={gift.id} gift={gift} onChooseGift={handleChooseGift} />
        ))}
      </GiftListWrapper>

    </Container>
  );
};

export default GiftList;
