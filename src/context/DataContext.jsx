import axios from 'axios'
import React, {createContext, useEffect, useState} from 'react'

export const DATA=createContext([])

function DataContext({children}) {
    const [data, setData] = useState(null)
    useEffect(
        () =>{
            axios
            .get("https://makeup-api.herokuapp.com/api/v1/products.json")
            .then(res => setData(res.data))
}, []);
  return (
    <DATA.Provider value={data}>
        {children}
    </DATA.Provider>
  )
}

export default DataContext