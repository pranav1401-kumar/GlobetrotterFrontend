import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Destination API calls
export const getRandomDestination = async () => {
  try {
    const response = await axios.get(`${API_URL}/destinations/random`);
    return response.data;
  } catch (error) {
    console.error('Error fetching random destination:', error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/destinations/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destination details:', error);
    throw error;
  }
};

export const getDestinationOptions = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/destinations/options/${id}`);
    return response.data.options;
  } catch (error) {
    console.error('Error fetching destination options:', error);
    throw error;
  }
};

// User API calls
export const registerUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, { username });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const updateUserScore = async (userId, isCorrect) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/score`, { isCorrect });
    return response.data;
  } catch (error) {
    console.error('Error updating user score:', error);
    throw error;
  }
};