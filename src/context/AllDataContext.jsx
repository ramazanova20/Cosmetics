import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllData } from "../services/api";

export const DataContext = createContext();

export const useAllDataContext = () => {  
  return useContext(DataContext);
};

function DataContextProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllData().then(res => setData(res));
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
