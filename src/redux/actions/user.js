import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../store';

export const login = createAsyncThunk('user/login', async ({ email, password }, { dispatch }) => {
  try {
    dispatch({ type: 'loginRequest' });
    const { data } = await axios.post(`${server}/login`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('Login Success:', data);
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    console.error('Login Failed:', error);
    dispatch({ type: 'loginFail', payload: error.response?.data?.message || 'An error occurred' });
  }
});
