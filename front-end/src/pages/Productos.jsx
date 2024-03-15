import React, { useState, useEffect } from "react";
import axios from "axios";
import CargarProducto from "../components/CargarProducto";
import moment from "moment";
import Search from "../assets/icons/Search.png";

//icons
import packages from "../assets/icons/packages.svg";
import product from "../assets/icons/product.svg";
import CargarStock from "../components/CargarStock";

const Productos = () => {
 
  const [data, setData] = useState([]);
  const [buscador, setBuscador] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [elementoEditado, setElementoEditado] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/productos");
        const productosJson = response.data;
        const productosOrdenadas = productosJson.sort(
          (a, b) => new Date(b.ingreso) - new Date(a.ingreso)
        );
        setData(productosOrdenadas);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleBuscar = (e) => {
   
    e.preventDefault();
    setBuscador(e.target.value);
  };

  const results = !buscador
  ? data
  : data.filter(
      (dato) =>
        dato.nombre.toLowerCase().includes(buscador.toLowerCase()) ||
        (dato.nFactura && dato.nFactura.toString().includes(buscador))
    );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleEliminarFactura = (idProducto) => {
    setData((prevData) =>
      prevData.filter((producto) => producto.id !== idProducto)
    );
  };

  const handleFacturaCargada = async () => {
    try {
      // Lógica para cargar productos después de cargar la factura
      const response = await axios.get("http://10.27.64.211:3001/api/productos");
      const productosJson = response.data.sort(
        (a, b) => new Date(b.ingreso) - new Date(a.ingreso)
      );
      setData(productosJson);
    } catch (error) {
      console.error("Error al obtener datos después de cargar factura:", error);
    }
  };

  return (
    <>
     <div className="flex-1 p-6 container mx-auto">
     <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={packages} /> Productos
      </div>
      <div className="">
        <div className="flex  md:flex-nowrap  gap-3 justify-between text-center items-center ">
       
          <input
            type="text"
            value={buscador}
            onSubmit={handleBuscar}
            onChange={(e) => setBuscador(e.target.value)}
            placeholder="Ingresa aquí el nombre del producto a buscar"
            className=" mt-2 form-control container w-6/6 md:w-4/6 rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            onClick={handleBuscar}
            className="flex  py-2 justify-center   text-base  w-6/6   md:w-1/6 md:h-10 mt-2 rounded-md bg-indigo-600 text-center  gap-3 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <img src={Search} alt="search" />
            <p>BUSCAR</p>
          </button>
          <CargarProducto onFacturaCargada={handleFacturaCargada} />
        </div>
      </div>
      <div className="mt-4 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={product} alt="search" />
        Ultimos productos
      </div>
      <hr></hr>
      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400">
          <thead className="text-xs  uppercase bg-gray-500 text-white">
            <tr className="">
              <th scope="col" className="p-3 text-center">
                fecha ingreso
              </th>
              <th scope="col" className="p-3 text-center">
                DESCRIPCION
              </th>
              <th scope="col" className="p-3 text-center">
                STOCK
              </th>
              <th scope="col" className="p-3 text-center">
                 OBSERVACIONES
              </th>
              <th scope="col" className="p-3 text-center">
                AGREGAR STOCK
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b   hover:bg-indigo-100 cursor-pointer text-center  "
              >
                <td className="p-2">
                  {moment(item.ingreso).format("DD/MM/YYYY HH:mm:ss")}
                </td>
                <td className="p-2">{item.nombre}</td>
                <td className="p-2"> {item.stock}</td>
                <td className="p-2 ">
                <p className={item.stock >= 10 ? "text-green-400" : "text-red-400"}>
                    {item.stock >= 10 ? "STOCK SUFICIENTE" : "REALIZAR PEDIDO"}
                </p>
                </td>
                <td className="p-2">  <CargarStock producto={item} onStockCargado={handleFacturaCargada} /></td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center mt-2">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Total{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.length}
          </span>{" "}
          productos
        </span>
        <div className="inline-flex mt-1 xs:mt-0 gap-3">
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= results.length}
          >
            Siguiente
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Productos;
