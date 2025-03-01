import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import Game from './components/Game';
import UserRegistration from './components/UserRegistration';
import FriendInvite from './components/FriendInvite';
import { getUserById } from './services/api';
import './styles/App.css';

// Styled components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  color: white;
  font-family: 'Montserrat', sans-serif;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Main = styled.main`
  width: 100%;
  max-width: 800px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

// Component to handle challenge invite route
const ChallengeRoute = () => {
  const { userId } = useParams();
  const [inviter, setInviter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInviter = async () => {
      try {
        const userData = await getUserById(userId);
        setInviter(userData);
        setLoading(false);
      } catch (err) {
        setError('Could not find this user. The invitation might be invalid.');
        setLoading(false);
      }
    };

    fetchInviter();
  }, [userId]);

  if (loading) {
    return <div>Loading invitation...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <FriendInvite inviter={inviter} />;
};

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Title>🌍 Globetrotter Challenge</Title>
          <Subtitle>Test your knowledge of world destinations!</Subtitle>
        </Header>
        <Main>
          <Routes>
            <Route path="/" element={<UserRegistration />} />
            <Route path="/play/:userId" element={<Game />} />
            <Route path="/challenge/:userId" element={<ChallengeRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Main>
      </AppContainer>
    </Router>
  );
}

export default App;