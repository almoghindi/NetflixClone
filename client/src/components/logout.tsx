import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../store/slices/authSlice';
import { RootState } from '../store/store';
import { sendRequest } from '../hooks/use-request';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const dispatch = useDispatch();
  const {  } = useSelector((state: RootState) => state.auth);

  const navigate = useNavigate();

  const handleLogOutClick = async () => {
 
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

      navigate('/login');
    } catch (error) {
      new Error(error instanceof Error ? error.message : 'An error occurred');
    }
  };
  
  return (
    <>
      <button className='hover:underline' onClick={handleLogOutClick}>Sign Out</button>
    </>
  );
};

export default Logout;