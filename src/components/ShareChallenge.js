import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ShareButton = styled(motion.button)`
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #E91E63;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareIcon = styled.span`
  font-size: 1.2rem;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background-color: #2a3950;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
`;

const ShareTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: white;
  text-align: center;
`;

const ShareDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 25px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;

const ShareImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const Globe = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const LinkContainer = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const LinkInput = styled.input`
  background: none;
  border: none;
  color: white;
  flex-grow: 1;
  outline: none;
  font-size: 0.9rem;
`;

const CopyButton = styled(motion.button)`
  background-color: #4CAF50;
  border: none;
  border-radius: 6px;
  color: white;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
`;

const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
`;

const WhatsAppButton = styled(motion.button)`
  background-color: #25D366;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareChallenge = ({ userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const linkRef = useRef(null);
  
  const challengeLink = `${window.location.origin}/challenge/${userId}`;
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCopied(false);
  };
  
  const handleCopyLink = () => {
    if (linkRef.current) {
      linkRef.current.select();
      document.execCommand('copy');
      setIsCopied(true);
      
      // Reset copied state after 3 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };
  
  const handleShareWhatsApp = () => {
    const text = `Hey! I challenge you to beat my score in the Globetrotter Challenge. Click here to play: ${challengeLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <>
      <ShareButton
        onClick={handleOpenModal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShareIcon>🎯</ShareIcon>
        Challenge a Friend
      </ShareButton>
      
      <AnimatePresence>
        {isModalOpen && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
              
              <ShareTitle>Challenge Your Friends!</ShareTitle>
              <ShareDescription>
                Share this link with your friends and see who knows more about world destinations!
              </ShareDescription>
              
              <ShareImage>
                <Globe>🌍</Globe>
                <div>Can you beat my Globetrotter score?</div>
                <div style={{ fontSize: '0.9rem', marginTop: '10px', opacity: 0.8 }}>
                  Click the link to accept the challenge!
                </div>
              </ShareImage>
              
              <LinkContainer>
                <LinkInput
                  ref={linkRef}
                  value={challengeLink}
                  readOnly
                  onClick={(e) => e.target.select()}
                />
                <CopyButton
                  onClick={handleCopyLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCopied ? 'Copied!' : 'Copy'}
                </CopyButton>
              </LinkContainer>
              
              <SocialButtons>
                <WhatsAppButton
                  onClick={handleShareWhatsApp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>📱</span> Share on WhatsApp
                </WhatsAppButton>
              </SocialButtons>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShareChallenge;