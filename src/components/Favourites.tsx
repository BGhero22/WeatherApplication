import React, { useEffect, useState } from 'react';
import { Favorite } from '../types';
import { Button } from 'primereact/button';
import axios from 'axios';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const fetchFavorites = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/favorites');
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const removeFavorite = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3001/favorites/${id}`);
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>
            {fav.location}
            <Button
              label="Remove"
              icon="pi pi-times"
              className="p-button-danger p-button-text"
              onClick={() => removeFavorite(fav.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
