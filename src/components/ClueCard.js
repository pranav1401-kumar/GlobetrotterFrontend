import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Card = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #FFD700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const ClueList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ClueItem = styled(motion.li)`
  padding: 12px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 1.1rem;
  line-height: 1.4;
  border-left: 3px solid #FFD700;
`;

const ClueCard = ({ clues }) => {
  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CardTitle>
        <span role="img" aria-label="magnifying glass">🔍</span> Where in the world is this place?
      </CardTitle>
      
      <ClueList
        as={motion.ul}
        variants={container}
        initial="hidden"
        animate="show"
      >
        {clues.map((clue, index) => (
          <ClueItem key={index} variants={item}>
            {clue}
          </ClueItem>
        ))}
      </ClueList>
    </Card>
  );
};

export default ClueCard;