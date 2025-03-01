import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const OptionsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const OptionsTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: white;
`;

const OptionsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 15px;
`;

const OptionButton = styled(motion.button)`
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: ${props => {
    if (props.selectedAnswer && props.id === props.selectedAnswer) {
      return props.correct ? '#4CAF50' : '#f44336';
    }
    return 'rgba(255, 255, 255, 0.15)';
  }};
  color: white;
  font-size: 1.1rem;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.25);
  }
  
  &:disabled {
    cursor: ${props => props.selectedAnswer ? 'default' : 'not-allowed'};
    opacity: ${props => props.selectedAnswer ? 1 : 0.7};
  }
`;

const CountryName = styled.div`
  font-size: 0.9rem;
  margin-top: 5px;
  opacity: 0.8;
`;

const IconOverlay = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 1.5rem;
`;

const AnswerOptions = ({ options, onSelect, selectedAnswer, disabled }) => {
  return (
    <OptionsContainer>
      <OptionsTitle>Select your answer:</OptionsTitle>
      
      <OptionsList>
        {options.map((option) => (
          <OptionButton
            key={option.id}
            id={option.id}
            selectedAnswer={selectedAnswer}
            correct={selectedAnswer === option.id}
            onClick={() => onSelect(option.id)}
            disabled={disabled || selectedAnswer !== null}
            whileHover={{ scale: disabled ? 1 : 1.03 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
          >
            {option.city}
            <CountryName>{option.country}</CountryName>
            
            {selectedAnswer === option.id && (
              <IconOverlay>
                {selectedAnswer === option.id ? '✓' : '✗'}
              </IconOverlay>
            )}
          </OptionButton>
        ))}
      </OptionsList>
    </OptionsContainer>
  );
};

export default AnswerOptions;