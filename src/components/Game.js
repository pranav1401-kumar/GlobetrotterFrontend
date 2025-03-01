import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

import ClueCard from './ClueCard';
import AnswerOptions from './AnswerOptions';
import ResultFeedback from './ResultFeedback';
import ScoreTracker from './ScoreTracker';
import ShareChallenge from './ShareChallenge';

import { 
  getRandomDestination, 
  getDestinationById, 
  getDestinationOptions,
  getUserById,
  updateUserScore
} from '../services/api';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const GameHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.primary ? '#4CAF50' : '#2196F3'};
  color: white;
  cursor: pointer;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  text-align: center;
  margin: 50px 0;
`;

const Game = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [answerOptions, setAnswerOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [result, setResult] = useState(null);
  const [funFact, setFunFact] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Load user data on initial render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userId);
        setCurrentUser(user);
        loadNewDestination();
      } catch (err) {
        setError('Could not load user data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId]);
  
  // Load a new destination for the game
  const loadNewDestination = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    setResult(null);
    
    try {
      // Get a random destination with clues
      const destination = await getRandomDestination();
      setCurrentDestination(destination);
      
      // Get answer options including the correct one
      const options = await getDestinationOptions(destination.id);
      setAnswerOptions(options);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load game data. Please try again.');
      setLoading(false);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = async (answerId) => {
    setSelectedAnswer(answerId);
    
    // Check if answer is correct
    const isCorrect = answerId === currentDestination.id;
    
    // Get full destination details to show fun facts
    const destinationDetails = await getDestinationById(currentDestination.id);
    
    // Select a random fun fact
    const factArray = isCorrect ? destinationDetails.fun_fact : destinationDetails.trivia;
    const randomFact = factArray[Math.floor(Math.random() * factArray.length)];
    setFunFact(randomFact);
    
    // Set result and update user score
    setResult(isCorrect);
    
    // Trigger confetti animation if correct
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    // Update user score on the server
    if (currentUser) {
      try {
        const updatedUser = await updateUserScore(currentUser.id, isCorrect);
        setCurrentUser(updatedUser);
      } catch (err) {
        console.error('Failed to update score:', err);
      }
    }
  };
  
  // Handle play again button
  const handlePlayAgain = () => {
    loadNewDestination();
  };
  
  if (loading && !currentDestination) {
    return <LoadingText>Loading your adventure...</LoadingText>;
  }
  
  if (error) {
    return <LoadingText>{error}</LoadingText>;
  }

  return (
    <GameContainer>
      <GameHeader>
        <UserInfo>Player: {currentUser?.username}</UserInfo>
        <ScoreTracker score={currentUser?.score} />
      </GameHeader>
      
      <AnimatePresence mode="wait">
        {currentDestination && (
          <motion.div
            key={currentDestination.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%' }}
          >
            <ClueCard clues={currentDestination.clues} />
            
            <AnswerOptions 
              options={answerOptions} 
              onSelect={handleAnswerSelect} 
              selectedAnswer={selectedAnswer}
              disabled={result !== null}
            />
            
            {result !== null && (
              <ResultFeedback 
                isCorrect={result} 
                funFact={funFact}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <ButtonContainer>
        {result !== null && (
          <Button 
            primary 
            onClick={handlePlayAgain}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Destination
          </Button>
        )}
        
        <ShareChallenge userId={currentUser?.id} />
      </ButtonContainer>
    </GameContainer>
  );
};

export default Game;