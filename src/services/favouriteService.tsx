// Add necessary imports or a dummy import if none exist
import axios from 'axios';

export const addFavorite = async (location: string, userId: number) => {
  const response = await axios.post('http://localhost:3001/favorites', { location, userId });
  return response.data;
};

// If no exports exist, you can add this:
export {};

