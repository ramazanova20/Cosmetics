import React, { createContext, useState, useEffect, useContext } from "react";
import { getProductByName, getJeweleryData, getAllData, getInfoData } from "../services/api";

export const DATA = createContext();

export const useDataContext = () => {
  return useContext(DATA);
};

function DataContext({ children }) {
  const [data, setData] = useState({});
  const [jewelery, setJewelery] = useState(null);
  const [info, setInfo] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const productTypes = ["lipstick", "foundation", "eyeliner"];


  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  const addToFavorites = (item) => {
    setFavorites((listFavorites) => {
      if (!listFavorites.some((fav) => fav.id === item.id)) {
        return [...listFavorites, item];
      }
      return listFavorites;
    });
  };


  const removeFromFavorites = (id) => {
    setFavorites((listFavorites) =>
      listFavorites.filter((item) => item.id !== id)
    );
  };


  useEffect(() => {
    getJeweleryData().then((res) => setJewelery(res));
    getInfoData().then((res) => setInfo(res));

    const fetchData = async () => {
      let response = await getAllData();
      if (response) {
        setData(response);
      }
    };

    fetchData();

    productTypes.forEach(async (type) => {
      const res = await getProductByName(type);
      setData((currentData) => ({
        ...currentData,
        [type]: res,
      }));
    });
  }, []);
  

  return (
    <DATA.Provider
      value={{
        jewelery,
        info,
        favorites,
        addToFavorites,
        removeFromFavorites,
        setFavorites,
        data
      }}
    >
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
