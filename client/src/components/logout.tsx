import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth/authSlice';
import { RootState } from '../store/store';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state: RootState) => state.auth);

  const handleLogOutClick = () => {
    console.log(user); 
    dispatch(logout() as any);

  };
  
  return (
    <>
      <button onClick={handleLogOutClick}>Logout</button>
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Logout;