import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';

const InviteContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InviteHeader = styled(motion.div)`
  margin-bottom: 30px;
`;

const InviteTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #FFD700;
`;

const InviterInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  max-width: 400px;
  width: 100%;
`;

const InviterName = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ScoreDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const ScoreItem = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 10px 15px;
  text-align: center;
`;

const ScoreValue = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: ${props => props.color};
`;

const ScoreLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 5px;
`;

const ChallengeMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const AcceptForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 350px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled(motion.button)`
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
`;

const FriendInvite = ({ inviter }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (!inviter) {
    return <div>Invalid invitation. Please check the link and try again.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const user = await registerUser(username);
      // Save user ID in local storage for persistence
      localStorage.setItem('globetrotterId', user.id);
      localStorage.setItem('globetrotterUsername', user.username);
      
      // Navigate to game page
      navigate(`/play/${user.id}`);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to register. Please try again.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setIsLoading(false);
    }
  };

  // Calculate inviter's score statistics
  const totalAnswered = inviter.score.correct + inviter.score.incorrect;
  const accuracy = totalAnswered > 0 
    ? Math.round((inviter.score.correct / totalAnswered) * 100) 
    : 0;

  return (
    <InviteContainer>
      <InviteHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InviteTitle>You've Been Challenged!</InviteTitle>
      </InviteHeader>
      
      <InviterInfo>
        <InviterName>{inviter.username} has challenged you!</InviterName>
        
        <ScoreDisplay>
          <ScoreItem>
            <ScoreValue color="#4CAF50">{inviter.score.correct}</ScoreValue>
            <ScoreLabel>Correct Answers</ScoreLabel>
          </ScoreItem>
          
          <ScoreItem>
            <ScoreValue color="#FFD700">{accuracy}%</ScoreValue>
            <ScoreLabel>Accuracy</ScoreLabel>
          </ScoreItem>
        </ScoreDisplay>
      </InviterInfo>
      
      <ChallengeMessage>
        Can you beat {inviter.username}'s score in the Globetrotter Challenge? 
        Enter your name to start playing and show off your geography knowledge!
      </ChallengeMessage>
      
      <AcceptForm onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
          maxLength={30}
          autoFocus
        />
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLoading ? 'Loading...' : 'Accept Challenge'}
        </Button>
      </AcceptForm>
    </InviteContainer>
  );
};

export default FriendInvite;