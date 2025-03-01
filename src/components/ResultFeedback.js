import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackContainer = styled(motion.div)`
  margin-top: 25px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${props => props.isCorrect ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  border: 1px solid ${props => props.isCorrect ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
  text-align: center;
`;

const ResultIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const ResultHeading = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: ${props => props.isCorrect ? '#4CAF50' : '#f44336'};
`;

const FactContainer = styled(motion.div)`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const FactTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #FFD700;
`;

const FactText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const ResultFeedback = ({ isCorrect, funFact }) => {
  return (
    <AnimatePresence mode="wait">
      <FeedbackContainer
        isCorrect={isCorrect}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResultIcon>
          {isCorrect ? '🎉' : '😢'}
        </ResultIcon>
        
        <ResultHeading isCorrect={isCorrect}>
          {isCorrect ? 'Correct! Well done!' : 'Not quite right...'}
        </ResultHeading>
        
        <FactContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <FactTitle>
            {isCorrect ? 'Fun Fact:' : 'Interesting Trivia:'}
          </FactTitle>
          <FactText>{funFact}</FactText>
        </FactContainer>
      </FeedbackContainer>
    </AnimatePresence>
  );
};

export default ResultFeedback;