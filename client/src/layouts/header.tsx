import React from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <header>
      <h1>Netflix Clone</h1>
      {isLoggedIn ? (
        <button onClick={onLogout}>Logout</button>
      ) : (
        <button>Login</button>
      )}
    </header>
  );
};

export default Header;