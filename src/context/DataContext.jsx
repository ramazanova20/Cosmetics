import axios from 'axios'
import React, {createContext, useEffect, useState} from 'react'

export const DATA=createContext([])

function DataContext({children}) {
    const [data, setData] = useState(null)
    const [lip, setLip] = useState(null)
    const [foundation, setFoundation] = useState(null)
    const [eye, setEye] = useState(null)
    useEffect(
        () =>{
            getAllData()
            getLipData()
            getFoundationData()
            getEyeData()
        }, []);


        function getAllData(){
          axios
            .get("https://makeup-api.herokuapp.com/api/v1/products.json")
            .then((res) => {
              const limitedData = res.data.slice(0, 20); 
              setData(limitedData); 
            })
            
        }
        function getLipData(){
          axios
          .get('https://makeup-api.herokuapp.com/api/v1/products.json')
          .then((res) => {
            const lipLiners = res.data.filter((item) => item.product_type === 'lip_liner').slice(0, 20);
            const lipStick = res.data.filter((item) => item.product_type === 'lipstick').slice(0, 20);
            setLip(lipLiners);
            setLip(lipStick);
          })
            
        }
        function getFoundationData(){
          axios
          .get('https://makeup-api.herokuapp.com/api/v1/products.json')
          .then((res) => {
            const liquid = res.data.filter((item) => item.product_type === 'liquid').slice(0, 20);
            const foundation = res.data.filter((item) => item.product_type === 'foundation').slice(0, 20);
            setFoundation(liquid);
            setFoundation(foundation);
          })
            
        }
        function getEyeData(){
          axios
          .get('https://makeup-api.herokuapp.com/api/v1/products.json')
          .then((res) => {
            const eyeliner = res.data.filter((item) => item.product_type === 'eyeliner').slice(0, 20);
            const eyeshadow = res.data.filter((item) => item.product_type === 'eyeshadow').slice(0, 20);
            const mascara = res.data.filter((item) => item.product_type === 'mascara').slice(0, 20);

            setEye(eyeliner);
            setEye(eyeshadow);
            setEye(mascara);
          })
            
        }

  return (
    <DATA.Provider value={{data, lip, foundation, eye}}>
        {children}
    </DATA.Provider>
  )
}

export default DataContext