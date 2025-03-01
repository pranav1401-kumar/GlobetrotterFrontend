import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ScoreBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
`;

const ScoreLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 3px;
`;

const ScoreValue = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${props => props.color};
`;

const TotalScore = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: rgba(255, 215, 0, 0.2);
  border: 1px solid rgba(255, 215, 0, 0.3);
`;

const ScoreTracker = ({ score }) => {
  if (!score) {
    return null;
  }
  
  const totalScore = score.correct;
  const totalAnswered = score.correct + score.incorrect;
  const accuracy = totalAnswered > 0 ? Math.round((score.correct / totalAnswered) * 100) : 0;
  
  return (
    <ScoreContainer>
      <ScoreBox
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ScoreLabel>Correct</ScoreLabel>
        <ScoreValue color="#4CAF50">{score.correct}</ScoreValue>
      </ScoreBox>
      
      <ScoreBox
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ScoreLabel>Incorrect</ScoreLabel>
        <ScoreValue color="#f44336">{score.incorrect}</ScoreValue>
      </ScoreBox>
      
      <TotalScore
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <ScoreLabel>Accuracy</ScoreLabel>
        <ScoreValue color="#FFD700">{accuracy}%</ScoreValue>
      </TotalScore>
    </ScoreContainer>
  );
};

export default ScoreTracker;