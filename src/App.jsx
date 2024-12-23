import { React, useState, useEffect } from 'react';
import Main from './components/Main/Main';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Cosmetics from './components/Main/Cosmetics';
import Brend from './components/Main/Brend';
import Aksesuar from './components/Main/Aksesuar';
import Error from './components/Main/Error';
import Favorites from './components/Main/Favorites';
import Melumat from './components/Main/Melumat';
import ProductDetail from './components/Main/ProductDetail';
import Basket from './components/Main/Basket';
import { useDataContext } from "./context/DataContext";
import ProductInfo from './components/Main/ProductInfo';
import LogIn from './components/Main/LogIn';
import BrendInfo from './components/Main/BrendInfo';

function App() {
  // const [favorites, setFavorites] = useState([]);

  // // useEffect(() => {
  // //   const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
  // //   setFavorites(savedFavorites);
  // // }, []);
  // useEffect(() => {
  //   const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
  //   setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
  // }, []);
  
  // useEffect(() => {
  //   localStorage.setItem('favorites', JSON.stringify(favorites));
  // }, [favorites]);

  // const removeFromFavorites = (id) => {
  //   setFavorites((prevFavorites) =>
  //     prevFavorites.filter((item) => item.id !== id)
  //   );
  // };
  
  const { favorites, setFavorites, removeFromFavorites } = useDataContext();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main favorites={favorites} setFavorites={setFavorites}/>} />
        <Route path="/aksesuar" element={<Aksesuar favorites={favorites} setFavorites={setFavorites} />} />
        <Route path="/brend" element={<Brend />} />
        <Route path="/melumat" element={<Melumat />} />
        <Route path="/basket" element={<Basket/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/cosmetics/:id" element={<ProductDetail />} />
        <Route path="/aksesuar/:id" element={<ProductDetail />} />
        <Route path="/melumat/:id" element={<ProductInfo />} />
        <Route path="/brend/:brand" element={<BrendInfo />} />
        
        <Route
  path="/favorites"
  element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} />}
/>


        <Route
          path="/cosmetics"
          element={<Cosmetics favorites={favorites} setFavorites={setFavorites} />}
        />
        {/* <Route
          path="/favorites"
          element={<Favorites favorites={favorites} removeFromFavorites={setFavorites} />}
        /> */}
        
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}


export default App;
