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
import Contact from './components/Main/Contact';

function App() {

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
        <Route path="/contact" element={<Contact/>} />
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
        
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}


export default App;
