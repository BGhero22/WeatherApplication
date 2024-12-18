// Add necessary imports or a dummy import if none exist
import axios from 'axios';

export const loginWithGoogle = async () => {
  const response = await axios.get('http://localhost:3001/auth/google');
  return response.data;
};

// If no exports exist, you can add this:
export {};

