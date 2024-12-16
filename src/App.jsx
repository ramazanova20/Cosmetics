import { React, useState, useEffect } from 'react';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Cosmetics from './components/Main/Cosmetics';
import Brend from './components/Main/Brend';
import Aksesuar from './components/Main/Aksesuar';
import Error from './components/Main/Error';
import JewelryItem from './components/Main/JewelryItem';
// import FavoritesPage from './components/Main/FavoritePages';
import Favorites from './components/Main/Favorites';

function App() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        {/* <Route path="/cosmetics" element={<Cosmetics />} /> */}
        <Route path="/aksesuar" element={<Aksesuar />} />
        <Route path="/jewelery" element={<JewelryItem />} />
        <Route path="/brend" element={<Brend />} />
        {/* <Route
          path="/favorites"
          element={
            <FavoritesPage
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        /> */}
        {/* <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />} /> */}
        <Route
          path="/cosmetics"
          element={<Cosmetics favorites={favorites} setFavorites={setFavorites} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} removeFromFavorites={setFavorites} />}
        />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}


export default App;
