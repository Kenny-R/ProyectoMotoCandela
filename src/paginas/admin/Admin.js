import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import motoImg from './moto.png';
import repuestoImg from './repuestos.png';
import './Form.css';

const Admin = () => {

  const logout = () => {
    // Realiza lo necesario para el cierre de sesión
  };

  return (
    <div>
      <div className="sidebar">
        <Link to="/home">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div>
          <Link to="/admin/motos">
            <span className="moto-texto">Motos</span>
            <img src={motoImg} alt="Moto" className="moto-img" />
          </Link>
        </div>
        <div className="linea-horizontal" /> 
        <div>
          <Link to="/dashboard/repuestos">
            <span className="repuesto-texto">Repuestos</span>
            <img src={repuestoImg} alt="Repuestos" className="repuesto-img" />
          </Link>
        </div>
        <div>
          <button className="logout" onClick={logout}>
            <span className="logout-texto">Cerrar sesión</span>
          </button>
        </div>
      </div>
      
      <div className="contenido">
        {/* Contenido del admin */}
      </div>
    </div>
  );
};

export default Admin