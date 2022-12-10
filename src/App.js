import React, {useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import PokemonBook from "./pages/pokemon book/PokemonBook"
import Pokemon from "./component/pokemon/Pokemon"
import PokemonCard from "./pages/pokemon card/PokemonCard";

function App() {



  return (
      <>
          <Routes>
              <Route path = "/" element ={<PokemonBook/>}/>
              <Route path = "/PokemonCard/:id" element={<PokemonCard/>}/>
          </Routes>
      </>
  );
}

export default App;
