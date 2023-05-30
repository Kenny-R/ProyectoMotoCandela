import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./paginas/login/Login";
import NoEncontrado from "./paginas/comunes/NoEncontrado";
import Sidebar from "./componentes/sidebar/Sidebar"
import Motos from "./paginas/motos/Motos"
import Repuestos from "./paginas/repuestos/Repuestos"
import "./App.css"
function App() {
  return (
    <Routes>
      {/*Paginas Publicas*/}
      <Route path="/login" element={<Login />} />
      
      {/*Paginas privadas*/}
      <Route path="/" element={<Sidebar><Motos/></Sidebar>} />
      <Route path="/repuestos" element={<Sidebar><Repuestos/></Sidebar>} />

      

      {/*Otras*/}
      <Route path="*" element={<Sidebar><NoEncontrado /></Sidebar>} />
    </Routes>
  );
}

export default App;
