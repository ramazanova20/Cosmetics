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
  const [searchQuery, setSearchQuery] = useState(""); 
  // const [favorites, setFavorites] = useState([]); 
  

  const productTypes = ["lipstick", "foundation", "eyeliner"];

  useEffect(() => {
    getJeweleryData().then((res) => setJewelery(res));
  }, []);
  useEffect(() => {
    getInfoData().then((res) => setInfo(res));
  }, []);

  useEffect(() => {
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
  

  // const addToFavorites = (item) => {
  //   setFavorites((lastFavorites) => {
  //     if (!lastFavorites.some((fav) => fav.id === item.id)) {
  //       return [...lastFavorites, item];
  //     }
  //     return lastFavorites;
  //   });
  // };

  // const removeFromFavorites = (id) => {
  //   setFavorites((lastFavorites) =>
  //     lastFavorites.filter((item) => item.id !== id)
  //   );
  // };

  const filterAndSortData = () => {
    const filteredData = {};

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        filteredData[key] = data[key]
          .filter((item) => {
            const searchTerm = searchQuery.toLowerCase();
            return (item.name || item.title)
              .toLowerCase()
              .includes(searchTerm);
          })
          .slice(0, 10);
      } else {
        filteredData[key] = data[key];
      }
    });

    return filteredData;
  };

  const filteredData = filterAndSortData();

  return (
    <DATA.Provider value={{ 
      ...filteredData, 
      jewelery,
      info, 
      // favorites,  
      // addToFavorites,  
      // removeFromFavorites, 
      setSearchQuery 
    }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
