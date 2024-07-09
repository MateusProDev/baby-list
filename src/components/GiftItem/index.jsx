import React, { useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';

const GiftItemWrapper = styled.div`
  position: relative;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 200px;
  transition: all 0.3s ease-in-out;

  /* Animacao para esmaecer e desaparecer */
  &.fade-out {
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none; /* Desativa eventos de mouse */
  }
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

const GuestNameInput = styled.input`
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  margin-top: 10px;
  padding: 8px;
  width: 100%;
`;

const ChooseButton = styled.button`
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  &:hover {
    background-color: #ff4c4c;
  }
`;

const SuccessMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  opacity: 0.9;
`;

const QuantityLabel = styled.p`
  font-size: 14px;
  color: #666666;
  margin-top: 8px;
`;

const GiftItem = ({ gift, onChooseGift }) => {
  const [guestName, setGuestName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChoose = async () => {
    if (guestName.trim()) {
      const success = await onChooseGift(gift.id, guestName, gift.quantityAvailable);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000); // Mostrar por 5 segundos
        setTimeout(() => setFadeOut(true), 300); // Começa a esmaecer após 0.3 segundos
        setTimeout(() => setFadeOut(false), 1000); // Desaparece completamente após 1 segundo
      }
    } else {
      alert('Por favor, insira seu nome.');
    }
  };

  return (
    <GiftItemWrapper className={fadeOut ? 'fade-out' : ''}>
      <GiftImage src={gift.image} alt={gift.name} />
      <GiftName>{gift.name}</GiftName>
      <QuantityLabel>Quantidade disponível: {gift.quantityAvailable}</QuantityLabel>
      <GuestNameInput
        type="text"
        placeholder="Seu nome e sobrenome"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
      />
      <ChooseButton onClick={handleChoose} disabled={showSuccess}>
        Escolher Presente
      </ChooseButton>
      {showSuccess && (
        <SuccessMessage>
          <p>Obrigado por escolher este presente!</p>
          <Confetti width={200} height={200} />
        </SuccessMessage>
      )}
    </GiftItemWrapper>
  );
};

export default GiftItem;
