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
  // const [searchQuery, setSearchQuery] = useState("");
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
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((fav) => fav.id === item.id)) {
        return [...prevFavorites, item];
      }
      return prevFavorites;
    });
  };


  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== id)
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
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const allData = await getAllData();
  //       setData(allData);
  
  //       const productPromises = productTypes.map((type) => getProductByName(type));
  //       const productData = await Promise.all(productPromises);
  
  //       const productMap = productTypes.reduce((acc, type, index) => {
  //         acc[type] = productData[index];
  //         return acc;
  //       }, {});
  
  //       setData((currentData) => ({ ...currentData, ...productMap }));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  
  //   fetchData();
  //   getJeweleryData().then(setJewelery);
  //   getInfoData().then(setInfo);
  // }, []);
  

  // const filterAndSortData = () => {
  //   console.log("Filtering data with search query:", searchQuery); // Check if searchQuery is updated

  //   const filteredData = {};

  //   // Object.entries(data)
  //   //   .map(([, value]) => value)
  //   //   .filter(item => item.name?.includes(searchQuery))

  //   Object.entries(data)
  //   .map(([, value]) => value)
  //   .filter(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()))

  //   return filteredData;
  // };

  //baax
  // const filterAndSortData = () => {
  //   if (!searchQuery.trim()) {
  //     return data; // Əgər sorğu boşdursa, hamısını qaytar
  //   }
  
  //   const filteredData = {};
  
  //   Object.entries(data)
  //   .map(([, value]) => value)
  //   .filter(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()))

  
  //   return filteredData;
  // };
  


  // const filteredData = filterAndSortData();

  return (
    <DATA.Provider
      value={{
        // ...filteredData,
        jewelery,
        info,
        favorites,
        addToFavorites,
        removeFromFavorites,
        setFavorites,
        // searchQuery, setSearchQuery
        // counts
      }}
    >
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
