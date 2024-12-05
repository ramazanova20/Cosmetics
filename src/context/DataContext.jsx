import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllData, getJeweleryData } from "../services/api";
import { useLocation } from "react-router-dom";

export const DATA = createContext();

export const useDataContext = () => {
  return useContext(DATA);
};

function DataContext({ children }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  
  let searchQuery = queryParams.get("tip");

  const [data, setData] = useState(null);
  const [lipstick, setLip] = useState(null);
  const [foundation, setFoundation] = useState(null);
  const [eyeliner, setEyeliner] = useState(null);
  const [jewelery, setJeweleryData] = useState(null);

  useEffect(() => {
    getJeweleryData().then(res => setJeweleryData(res));
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      let response = await getAllData(); 
      if (response) {
        setData(response);
      }
    };
    fetchData(); 
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      filterData(searchQuery, data);
    }
  }, [data, searchQuery]);

  const filterData = (searchQuery, data) => {
    const filters = {
      foundation: setFoundation,
      lipstick: setLip,
      eyeliner: setEyeliner,
    };

    if (filters[searchQuery]) {
      const filtered = data.filter((item) =>
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      filters[searchQuery](filtered);
    } else if (searchQuery === "data") {
      setData(data); // Ensure no endless loop here
    }
  };

  return (
    <DATA.Provider value={{ data, lipstick, foundation, eyeliner, jewelery }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
