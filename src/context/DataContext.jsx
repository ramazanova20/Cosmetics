import React, { createContext, useState, useEffect, useContext } from "react";
import { getProductByName, getJeweleryData, getAllData } from "../services/api";

export const DATA = createContext();

export const useDataContext = () => {
  return useContext(DATA);
};

function DataContext({ children, searchQuery, sortOrder }) {
  const [data, setData] = useState({});
  const [jewelery, setJewelery] = useState(null);

  const productTypes = ["lipstick", "foundation", "eyeliner"];

  useEffect(() => {
    getJeweleryData().then((res) => setJewelery(res));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getAllData();
      if (response) {
        setData(response); // Bütün məlumatları yüklə (zərgərlik daxil)
      }
    };

    fetchData();

    productTypes.forEach(async (type) => {
      const res = await getProductByName(type);
      setData((currentData) => ({
        ...currentData,
        [type]: res, // Xüsusi məhsul tipini yeniləyirik
      }));
    });
  }, []);

  const filterAndSortData = () => {
    const filteredData = {};

    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) { // Əgər data bir array-dirsə
        // Burada axtarış query parametrini işlədirik
        filteredData[key] = data[key]
          .filter((item) => {
            const searchTerm = searchQuery?.toLowerCase() || "";
            return (item.name || item.title)
              .toLowerCase()
              .includes(searchTerm); // Ad və başlıq üzrə axtarış
          })
          .sort((a, b) => {
            if (sortOrder === "asc") {
              return a.price - b.price; // Azdan çoxa sıralama
            } else if (sortOrder === "desc") {
              return b.price - a.price; // Çoxdan aza sıralama
            }
            return 0; // Sıralama yoxdursa
          })
          .slice(0, 10); // İlk 10 məhsulu alırıq
      } else {
        filteredData[key] = data[key];
      }
    });

    return filteredData;
  };

  const filteredData = filterAndSortData();

  // Köhnə koddakı filter və tip məntiqini burada saxlayırıq
  const filterByType = (searchQuery, data) => {
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

  // Filtered data-ya uyğun komponenti göstəririk
  return (
    <DATA.Provider value={{ ...filteredData, jewelery }}>
      {children}
    </DATA.Provider>
  );
}

export default DataContext;