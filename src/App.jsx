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
import UzCosmetics from './components/Main/UzCosmetics'
import LipCosmetics from './components/Main/LipCosmetics'
import EyeCosmetics from './components/Main/EyeCosmetics'
import Item from './components/Main/Item'
import UzBaxim from './components/Main/UzBaxim'
import SacBaxim from './components/Main/SacBaxim'
import BedenBaxim from './components/Main/BedenBaxim'
import Gigiyena from './components/Main/Gigiyena'


function App() {
  

  return (
    <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={<Main />} />
      <Route path="/basic" element={<MainBasic/>} />
      <Route path="/cosmetics" element={<Cosmetics/>} />
      <Route path="/baxim" element={<Baxim/>} />
      <Route path="/brend" element={<Brend/>} />
      <Route path="/aksesuar" element={<Aksesuar/>} />
      <Route path="/melumat" element={<Melumat/>} />
      <Route path="/uzcosmetics" element={<UzCosmetics/>} />
      <Route path="/lipcosmetics" element={<LipCosmetics/>} />
      <Route path="/eyecosmetics" element={<EyeCosmetics/>} />
      <Route path="/uzbaxim" element={<UzBaxim/>} />
      <Route path="/sacbaxim" element={<SacBaxim/>} />
      <Route path="/bedenbaxim" element={<BedenBaxim/>} />
      <Route path="/gigiyena" element={<Gigiyena/>} />
      <Route path="/items/:category" element={<Item />} />

      <Route path="*" element={<Error/>} />
    </Route>
  </Routes>
  )
}

export default App
