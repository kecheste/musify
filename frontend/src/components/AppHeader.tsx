import React from "react";
import styled from "@emotion/styled";

const MusicNoteIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 3V14.554C11.3744 14.1991 10.6351 14 9.84615 14C7.67948 14 6 15.7909 6 18C6 20.2091 7.67948 22 9.84615 22C11.2734 22 12.5033 21.2455 13.1538 20.127V9.44701C13.7795 9.80188 14.5188 10 15.3077 10C17.4744 10 19.1538 8.20914 19.1538 6C19.1538 3.79086 17.4744 2 15.3077 2C14.5139 2 13.7852 2.19334 13.1538 2.535V3H12Z" />
  </svg>
);

const Header = styled.header`
  width: 100%;
  padding: 0;
  margin: 0;
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  gap: 24px;

  @media (max-width: 768px) {
    padding: 12px 16px;
    gap: 16px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #6d6d6dff 0%, #d3b588ff 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(20, 20, 20, 0.4);
  }
`;

interface AppHeaderProps {
  onAddSong: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ onAddSong }) => {
  return (
    <Header>
      <HeaderContent>
        <Logo href="/">
          <MusicNoteIcon />
          Musify
        </Logo>
        <PrimaryButton onClick={onAddSong}>Add Song</PrimaryButton>
      </HeaderContent>
    </Header>
  );
};

export default AppHeader;
