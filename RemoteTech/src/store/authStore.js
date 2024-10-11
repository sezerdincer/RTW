// src/stores/authStore.js
import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

const useAuthStore = create((set) => ({
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token } = response.data;
      Cookies.set('token', token, { expires: 1, secure: true, sameSite: 'Strict' });
      set({ isAuthenticated: true });
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Invalid credentials or access denied.');
    }
  },

  logout: async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      Cookies.remove('token'); // Remove token from cookie
      set({ isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    }
  },

  getToken: () => {
    return Cookies.get('token');
  },
}));

export default useAuthStore;
