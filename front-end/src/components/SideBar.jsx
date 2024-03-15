import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
//icons
import control from "../assets/icons/control.png";
import files from '../assets/icons/files.svg';
import rocket from '../assets/icons/rocket.svg'
import chart from '../assets/icons/chart.svg'
import logout from '../assets/icons/logout.svg'
import check from '../assets/icons/check.svg'
import product1 from "../assets/icons/product1.svg";
import ingenieria from "../assets/logo/ingenieria.png";
import historia from '../assets/icons/historia.svg'
import producto from '../assets/icons/producto.svg'
import down from '../assets/icons/down.svg'



const SideBar = ({ setLoggedIn }) => {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const Menus = [
    //{ title: "Dashboard", src: `${chart}`, link:"/Dashboard" },
   //s { title: "Productos", src: `${producto}`},
   // { title: "Stock", src: `${product1}`},
    { title: "Auditoria", src: `${check}` },
    { title: "Imagenes", src: `${files}`},
    { title: "Reportes", src: `${chart}` },
   // { title: "Lanzamientos", src: `${rocket}` },
   // { title: "MQS", src: `${check}`},
    //{ title: "Productos", src: `${product1}`, gap: true },
     // { title: "Consumibles", src: `${Setting}` },
     {
      title: "Stock",
      src: `${product1}`,
      dropdown: [
        { title: "Dashboard", src: `${chart}`, link:"/Dashboard" },
        { title: "Productos", src: `${product1}`, link: "/Productos"},
        { title: "Consumibles", src: `${product1}`,link: "/Consumibles"},
        { title: "Estadisticas", src: `${product1}`,link: "/Estadisticas"},
      
        // Add more subproducts as needed
      ],
    },
     
     
     
     
  ];
////////////////////////////////////////////////////////////////
 const Salir = [{
     title: "Cerrar sesión", src: `${logout}`, gap: true,
 }]
 
 const closeDropdown = () => {
  setOpenDropdown(false);
};


const handleLogout = () => {
    // Lógica para cerrar sesión, por ejemplo, limpiar el token de localStorage
    setLoggedIn(false);
    localStorage.removeItem("token");
  };


  return (
    <>

      <div className={` ${ open ? " w-54" : "w-20 " } bg-[#343285] h-screen   p-5  pt-4 relative duration-300 justify-between md:justify-between flex flex-col `} >
            <img alt="t" src={control}  className={`absolute cursor-pointer -right-3 top-6 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}/>
        <Link to="/Home" className="flex gap-x-2 items-center  ">
            <img  alt="t2" src={ingenieria}  className={` cursor-pointer duration-500 ${ open && "rotate-[360deg] w-20" }`} />
               <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && "scale-0" }`} >
                  I + Test
               </h1>
        </Link>
        <div>
          {Menus.map((Menu, index) => (
            <ul className="grid justify-items-start" key={index}>
              <li className={`flex rounded-md p-1 md:p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-2 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}>
                {Menu.dropdown ? (
                  
                    <div className="relative">
                      <div
                        className="flex rounded-md   cursor-pointer hover:bg-light-white  text-gray-300 text-sm items-center gap-x-4 hover:bg-[#5755b88f] "
                        onClick={() => setOpenDropdown(!openDropdown)}
                      >
                        <img src={`${Menu.src}`} alt="logos" />
                        <span className={`${!open && "hidden"} mt-1.5 origin-left duration-200`}>
                          {Menu.title}
                        </span>
                        <img src={down} alt="dropdown-icon" className="w-3 h-3 " />
                      </div>
                      {openDropdown && (
                        <ul className="grid justify-items-start absolute top-0 left-full bg-[#343285]   p-2 rounded-md">
                          {Menu.dropdown.map((item, i) => (
                             <li key={i} className={`flex rounded-md p-1 md:p-2 cursor-pointer hover:bg-light-white  hover:bg-[#5755b88f] text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}   onClick={closeDropdown}>
                              <Link to={item.link}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  
                ) : (
                  <Link to={Menu.title} className={`container hover:bg-[#5755b88f] hover:rounded-lg flex justify-center gap-3`} href={Menu.title}>
                    <img src={`${Menu.src}`} alt="logos" />
                    <span className={`${!open && "hidden"} mt-1.5 origin-left duration-200`}>
                      {Menu.title}
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          ))}
          </div>
        <ul className="grid justify-items-start">
              {Salir.map((Salir, index) => (
                <li key={index} className="flex  rounded-md p-1  cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4"   >
                  <img src={logout}/>
                  <span onClick={handleLogout} className={`${!open && "hidden"} mt-1.5 origin-left duration-200`}  >
                    {Salir.title}
                  </span>
               </li>
                 ))}
              </ul>
        </div>
    </>
  );
};

export default SideBar;
