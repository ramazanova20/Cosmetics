import React, { createContext, useState, useEffect, useContext } from "react";
import { getAllData, getJeweleryData, getProductByName } from "../services/api";
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
  const [jewelery, setJewelery] = useState(null);



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

    if (searchQuery === "jewelery") {
      let jew = data.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setJewelery(jew)
      return
    }
    if (data) {
      setData(
        data.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  return (
    <DATA.Provider value={{ data, lipstick, foundation, eyeliner, jewelery }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
