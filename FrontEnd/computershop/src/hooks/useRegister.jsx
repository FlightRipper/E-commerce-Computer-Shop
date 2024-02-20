import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useRegister = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const register = async (username, password, confirmPassword) => {
    setError(null);
    console.log(username, password, confirmPassword);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('http://localhost:5000/users/register', formData);

      if (response.status === 200) {
        // Save the user to the local storage
        localStorage.setItem('user', JSON.stringify(response.data));

        // Update the context
        dispatch({ type: 'LOGIN', payload: response.data });

        setError('Registration successful');

        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setError('Registration failed: ' + error.response.data.message);
      } else {
        setError('Registration failed: ' + error.message);
      }
    }
  };
  return { register, error };
};