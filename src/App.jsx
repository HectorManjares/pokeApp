import { useState } from 'react'
import './App.css'
import UserInput from './component/UserInput'
import Pokedex from './component/Pokedex'
import PokedexDetail from './component/PokedexDetail'
import { HashRouter, Route, Routes } from "react-router-dom"
import ProtectedRoutes from './component/ProtectedRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <div className='App'>
      <Routes>
        <Route path="/" element={<UserInput />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/pokedex" element={<Pokedex/>}/>
          <Route path="/pokedex/:id" element={<PokedexDetail/>}/>
        </Route>
      </Routes>
      </div>
    </HashRouter>
  )
}

export default App
