import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../store/auth/authSlice';
import { RootState } from '../store/store';
import { sendRequest } from '../hooks/use-request';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const { error, user } = useSelector((state: RootState) => state.auth);

  const handleLogOutClick = async () => {
    console.log(user); 
    try {
      const userId = localStorage.getItem('userId');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!userId) {
        throw new Error('User not found. Please logIn again.');
      }

      await sendRequest({
        url: '/api/auth/logout',
        method: 'POST',
        body: { userId, refreshToken },
      })

      dispatch(logoutSuccess());

      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

    } catch (error) {
      new Error(error instanceof Error ? error.message : 'An error occurred');
    }

  };
  
  return (
    <>
      <button onClick={handleLogOutClick}>Logout</button>
      {error && <p>Error: {error}</p>}
    </>
  );
};

export default Logout;