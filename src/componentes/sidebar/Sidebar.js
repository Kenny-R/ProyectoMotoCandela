import React from "react";
import logo from "./imagenes/logo.png";
import motoImg from "./imagenes/moto.png";
import repuestoImg from "./imagenes/repuestos.png";
import { NavLink } from 'react-router-dom';
import "./sidebarStyles.css";

const Sidebar = ({ children }) => {

  const menuItem=[
    {
        path:"/",
        name:"Motos",
        icon: motoImg,
        classNameImg: "moto-img"
    },
    {
        path:"/repuestos",
        name:"Repuestos",
        icon: repuestoImg,
        classNameImg: "repuesto-img"
    }
]
  return (
    <>
      <div className="container">
           <div style={{width:"200px"}} className="sidebar">
               <div className="top_section">
                   <img src={logo} className="logo" alt="Logo de Keeway"/>
                   <div style={{marginLeft: "50px"}} className="bars">
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="link_text">{item.name}</div>
                           <div><img src={item.icon} className={item.classNameImg} alt=""/></div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    </>
  );
};

export default Sidebar;

/* const Sidebar = ({Children}) => {
   
  const logout = () => {
    // Realiza lo necesario para el cierre de sesión
  };

  return (
    <div className="container">
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
          <Link to="/admin/repuestos">
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
      
      <main className="contenido">
        {Children}
      </main>
    </div>
  );
};

export default Sidebar */
