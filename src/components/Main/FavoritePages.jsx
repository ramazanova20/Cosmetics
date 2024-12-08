import React, { useEffect, useState } from 'react';

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  const [localFavorites, setLocalFavorites] = useState(favorites);

  useEffect(() => {
    setLocalFavorites(favorites); // Yenilənmiş favoritləri sinxronlaşdır
  }, [favorites]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Seçilmişlər</h2>
      {localFavorites.length === 0 ? (
        <p className="text-gray-500">Hələ seçilmiş məhsul yoxdur!</p>
      ) : (
        <ul className="space-y-2">
          {localFavorites.map((favorite, index) => (
            <li
              key={index}
              className="border p-2 rounded shadow flex justify-between items-center"
            >
              <span>{favorite.name}</span>
              <button
                onClick={() => removeFromFavorites(favorite.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesPage;
