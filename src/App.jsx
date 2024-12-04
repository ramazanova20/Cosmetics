import { React } from 'react'
import Main from './components/Main/Main'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Cosmetics from './components/Main/Cosmetics'
import Baxim from './components/Main/Baxim'
import MainBasic from './components/Main/MainBasic'
import Brend from './components/Main/Brend'
import Aksesuar from './components/Main/Aksesuar'
import Error from './components/Main/Error'
import Melumat from './components/Main/Melumat'

import Item from './components/Main/Item'
import JewelryItem from './components/Main/JewelryItem'



function App() {
  

  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Main />} />
      <Route path="/cosmetics" element={<Cosmetics/>} />
      <Route path="/aksesuar" element={<Aksesuar/>} />
      <Route path="/baxim" element={<Baxim/>} />
      <Route path="/jewelery" element={<JewelryItem/>} />
      {/* <Route path="/basic" element={<MainBasic/>} />
      <Route path="/baxim" element={<Baxim/>} />
      <Route path="/brend" element={<Brend/>} />
      <Route path="/aksesuar" element={<Aksesuar/>} />
      <Route path="/melumat" element={<Melumat/>} />
      
      <Route path="/items/:category" element={<Item />} /> */}

      <Route path="*" element={<Error/>} />
    </Route>
  </Routes>
  )
}

export default App
