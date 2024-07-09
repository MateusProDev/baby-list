import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, getDoc } from 'firebase/firestore'; // Importa getDoc junto com as outras funções necessárias
import { db } from '../../firebase/firebase'; // Importa db corretamente
import styled from 'styled-components';
import GiftItem from '../GiftItem';

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

  useEffect(() => {
    const fetchGifts = async () => {
      const giftsCollection = collection(db, 'gifts');
      const giftSnapshot = await getDocs(giftsCollection);
      const giftList = giftSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableGifts(giftList);
    };

    fetchGifts();
  }, []);

  const handleChooseGift = async (id, guestName, quantityAvailable) => {
    try {
      const giftRef = doc(db, 'gifts', id);
      const giftDoc = await getDoc(giftRef); // Usa getDoc corretamente

      if (giftDoc.exists()) {
        if (quantityAvailable > 0) {
          await updateDoc(giftRef, {
            chosenBy: guestName,
            quantityAvailable: quantityAvailable - 1 // Reduz a quantidade disponível do presente
          });
          
          // Atualiza a lista de presentes disponíveis
          setAvailableGifts(prevGifts => prevGifts.map(gift => {
            if (gift.id === id) {
              return { ...gift, chosenBy: guestName, quantityAvailable: quantityAvailable - 1 };
            }
            return gift;
          }));

          return true; // Indica que a escolha foi bem-sucedida
        } else {
          alert('Este presente não está mais disponível.');
        }
      } else {
        alert('Presente não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao escolher presente:', error);
      alert('Erro ao escolher presente. Por favor, tente novamente mais tarde.');
    }

    return false; // Indica que houve um erro na escolha do presente
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
