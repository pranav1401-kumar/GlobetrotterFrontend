import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { registerUser } from '../services/api';

const FormContainer = styled.div`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 12px 16px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  transition: all 0.3s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #45a049;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
`;

const UserRegistration = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  return (
    <FormContainer>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Create Your Globetrotter Profile
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Enter a username to start your journey around the world!
      </motion.p>
      
      <Form onSubmit={handleSubmit}>
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLoading ? 'Loading...' : 'Start Playing'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default UserRegistration;