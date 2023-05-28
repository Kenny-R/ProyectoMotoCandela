import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./paginas/login/Login";
import Admin from "./paginas/admin/Admin";
import NoEncontrado from "./paginas/comunes/NoEncontrado";
function App() {
  return (
    <Routes>
      {/*Paginas Publicas*/}
      <Route path="/" element={<Login />} />
      
      {/*Paginas privadas*/}
      <Route path="/admin" element={<Admin />} />
      

      {/*Otras*/}
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
}

export default App;
