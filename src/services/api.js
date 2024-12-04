import axios from "axios"
  
async function getAllData() {
   
    const res = await axios.get("https://makeup-api.herokuapp.com/api/v1/products.json")
    return res.data
}
async function getProductByName(product_type) {
    const res = await axios.get(`https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${product_type}`)
    return res.data
}
async function getJeweleryData() {
    const res = await axios.get("https://fakestoreapi.com/products")
    return res.data
}



export {
    getAllData, getProductByName, getJeweleryData
}