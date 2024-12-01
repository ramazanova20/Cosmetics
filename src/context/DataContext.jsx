import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const DATA = createContext();

export const useDataContext = () => {
  return useContext(DATA);
};

function DataContext({ children, searchQuery }) {
  const [data, setData] = useState(null); 
  const [lip, setLip] = useState(null);  
  const [foundation, setFoundation] = useState(null); 
  const [eye, setEye] = useState(null); 
  const [jewelery, setJewelery] = useState(null); 

  useEffect(() => {
    getAllData();
    getLipData();
    getFoundationData();
    getEyeData();
    getJeweleryData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      filterData();
    }
  }, [searchQuery]);

  // Filter function to apply searchQuery
  const filterData = () => {
    if (data) {
      setData(data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    if (lip) {
      setLip(lip.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    if (foundation) {
      setFoundation(foundation.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    if (eye) {
      setEye(eye.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
    if (jewelery) {
      setJewelery(jewelery.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  };

  function getAllData() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((res) => {
        const limitedData = res.data.slice(0, 20);
        setData(limitedData);
      })
      .catch((err) => console.error(err));
  }

  function getLipData() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((res) => {
        const lipLiners = res.data.filter((item) => item.product_type === "lip_liner").slice(0, 20);
        const lipStick = res.data.filter((item) => item.product_type === "lipstick").slice(0, 20);
        setLip([...lipLiners, ...lipStick]);
      });
  }

  function getFoundationData() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush")
      .then((res) => {
        const powder = res.data.filter((item) => item.product_type === "powder").slice(0, 20);
        const cream = res.data.filter((item) => item.product_type === "cream").slice(0, 20);
        setFoundation([...powder, ...cream]);
      });
  }

  function getEyeData() {
    axios
      .get("https://makeup-api.herokuapp.com/api/v1/products.json")
      .then((res) => {
        const eyeliner = res.data.filter((item) => item.product_type === "eyeliner").slice(0, 20);
        const eyeshadow = res.data.filter((item) => item.product_type === "eyeshadow").slice(0, 20);
        const mascara = res.data.filter((item) => item.product_type === "mascara").slice(0, 20);
        setEye([...eyeliner, ...eyeshadow, ...mascara]);
      });
  }

  function getJeweleryData() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const jewelery = res.data.filter((item) => item.category === "jewelery");
        setJewelery(jewelery);
      });
  }

  return (
    <DATA.Provider value={{ data, lip, foundation, eye, jewelery }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;
