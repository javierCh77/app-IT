import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios'
import ingenieria from "../assets/logo/ingenieria.png";
import login from "../assets/logo/login.svg";
import { useNavigate, Navigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    if (email === '' || password === '') {
      toast.warning('Falta completar alguno de los campos', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
  
    try {
      const response = await axios.post("http://10.27.64.211:3001/api/auth/login", {
        email: email,
        password: password,
      });
  
      const token = response.data.token;
      localStorage.setItem("token", token);
  
      // Realiza alguna acción adicional si es necesario
      setLoggedIn(true);
      navigate('/Home')  
      toast.success(`Bienvenido : ${email}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
       
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(
        "Error al iniciar sesión. Verifica tus credenciales o inténtalo de nuevo más tarde."
      );
    }
  };
  



  let token = sessionStorage.getItem('token');
  

  return (
    <>
        { token && <Navigate to='/Home'/>}
     <div className="flex flex-col md:flex-row items-center justify-around  bg-gradient-to-b from-white via-white to-[#343285] h-screen ">
      <div className="hidden md:block   md:w-auto ">
        <img src={login} alt="login" />
      </div>
      <div className=" p-8 rounded-xl shadow-lg  bg-[#1e1c4a]  text-[#8b6b6b] ">
      <div className="flex gap-2 p-6   align-middle justify-center md:full">
          <img src={ingenieria} width="85" alt="logo" />
          <h2 className="text-3xl mx-6 font-semibold mt-6 text-white">Ingenieria Testing</h2>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  text-sm font-medium mb-1 text-[#666bee]"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  text-sm font-medium mb-1 text-[#666bee]"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
             type="button"
            className="w-full hover:bg-[#848ff5] text-white py-2 rounded-md bg-[#666bee]"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
