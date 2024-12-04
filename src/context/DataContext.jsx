import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllData, getJeweleryData } from "../services/api";
import { useLocation, useParams } from "react-router-dom";

export const DATA = createContext();

export const useDataContext = () => {
  return useContext(DATA);
};

function DataContext({ children }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); 
  
  let searchQuery = queryParams.get("tip")

  // console.log(searchQuery)


  const [data, setData] = useState(null);
  const [lipstick, setLip] = useState(null);
  const [foundation, setFoundation] = useState(null);
  const [eyeliner, setEyeliner] = useState(null);
  // const [eyeshadow, setEyeshadow] = useState(null);
  // const [bronzer, setBronzer] = useState(null);
  // const [eyebrow, setEyebrow] = useState(null);
  const [jewelery, setJeweleryData] = useState(null);
  // const [nail_polish, setNailPolish] = useState(null);

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
    if(data){
      filterData()
    }
  }, [data])
  

  const filterData = () => {
    
   
    if (searchQuery === "foundation") {
      let face = data.filter((item) =>
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFoundation(face)
      return
    }
    if (searchQuery === "lipstick") {
      let lips = data.filter((item) =>
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setLip(lips)
      return
    }
    if (searchQuery === "eyeliner") {
      let eyes = data.filter((item) =>
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setEyeliner(eyes)
      return
    }
    if (searchQuery === "data") {
      let datas = data.filter((item) =>
        item.product_type.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setData(data)
      return
    }
    
   
  };

  return (
    <DATA.Provider value={{ data, lipstick, foundation, eyeliner, jewelery }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
