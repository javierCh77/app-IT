import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

//components
import SideBar from "./components/SideBar";
//pages
import Home from "./pages/Home";
//vistas
import DashboardStock from "./pages/DashboardStock";
import Consumibles from "./pages/Consumibles";
import Productos from "./pages/Productos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Estadisticas from "./pages/Estadisticas";
import Auditoria from "./pages/Auditoria";
import Imagenes from "./pages/Imagenes";
import Login from "./pages/Login";
import Reportes from "./pages/Reportes";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setAdmin] = useState(false); // Variable para el rol de admin

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Simula la obtención del rol de admin, puedes ajustar esto según tu lógica real
    const isAdminUser = /* Lógica para verificar si el usuario es admin */ true;

    if (token) {
      setLoggedIn(true);
      setAdmin(isAdminUser);
    } else {
      setLoggedIn(false);
      setAdmin(false);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="flex w-screen h-screen">
          {isLoggedIn && <SideBar setLoggedIn={setLoggedIn} />}
         
          <Routes>
            {isLoggedIn ? (
              <>
                <Route path="/Home" element={<Home />} />
                <Route path="/Consumibles" element={<Consumibles />} />
                <Route path="/Estadisticas" element={<Estadisticas />} />
                <Route path="/Productos" element={<Productos />} />
                <Route path="/Dashboard" element={<DashboardStock />} />
                <Route path="/Auditoria" element={<Auditoria />} />
                <Route path="/Imagenes" element={<Imagenes />} />
                <Route path="/Reportes" element={<Reportes />} />
                {isAdmin && (
                  <>
                    {/* Rutas solo para usuarios con rol de admin */}
                    {/* <Route path="/Productos" element={<Productos />} />
                    <Route path="/Dashboard" element={<DashboardStock />} />
                    <Route path="/Auditoria" element={<Auditoria />} />
                    <Route path="/Imagenes" element={<Imagenes />} /> */}
                  </>
                )}
              </>
            ) : (
              <>
                <Route
                  path="/Login"
                  element={
                    <div className="h-full w-full  ">
                      <Login setLoggedIn={setLoggedIn} />
                    </div>
                  }
                />

                {/* Redirigir a /Login si se intenta acceder a otras rutas sin estar logeado */}
                <Route path="/*" element={<Navigate to="/Login" />} />
              </>
            )}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
