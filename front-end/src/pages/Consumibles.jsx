import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from 'react-toastify';


//iconos
import packages from "../assets/icons/packages.svg";
import sumar from "../assets/icons/sumar.svg";
import restar from "../assets/icons/restar.svg";
import report from "../assets/icons/report.svg";

const Consumibles = () => {
  const [data, setData] = useState([{}]);
  const [linea, setLinea] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [producto, setProducto] = useState("");
  const [productos, setProductos] = useState([]);

  //////////////////////////////////////////////////////
  const handleSumar = () => {
    setCantidad(cantidad + 1);
  };
  const handleRestar = () => {
    if (cantidad > 0) {
      setCantidad(cantidad - 1);
    }
  };
  const handleSelectChange = (event) => {
    // Actualiza el estado 'linea' con el valor seleccionado en el select
    setLinea(event.target.value);
  };
  const handleProductoChange = (event) => {
    // Actualiza el estado 'producto' con la ID del producto seleccionado
    setProducto(event.target.value);
    console.log("ID del producto seleccionado:", event.target.value);
  };

  //////////////////////////////////////////////////////
  const handleEntregar = async () => {
    try {
      console.log("Datos a enviar:", { linea, cantidad, producto });

      const response = await axios.post(
        `http://10.27.64.211:3001/api/transacciones/${producto}/restar-stock`,
        {
          linea: linea,
          cantidad: parseInt(cantidad),
        }
      );

      if (response.status === 201) {
        // Si la respuesta es exitosa, mostrar alerta de éxito
        toast.success('Transacción creada con éxito', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        // Si la respuesta no es exitosa, mostrar alerta de error
        toast.error('Error al realizar la transacción', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }

      console.log("Transacción creada con éxito:", response.data);

      setCantidad(0);
      fetchData();
      setLinea("");
      setProducto("");
    } catch (error) {
      console.error("Error al entregar:", error);

      // Si hay un error, mostrar alerta de error
      toast.error('Error al realizar la transacción', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  //////////////////////////////////////////////////////////////////////////
  const handleFormSubmit = (event) => {
    // Evita que el formulario se envíe automáticamente y recargue la página
    event.preventDefault();
  };
  ////////////////////////////////////////////////////////////


  const fetchData = async () => {
    try {
      // Obtener productos desde la base de datos
      const responseProductos = await axios.get(
        "http://10.27.64.211:3001/api/productos"
      );
  
      // Ordenar productos alfabéticamente por nombre
      const productosOrdenados = responseProductos.data.sort((a, b) =>
        a.nombre.localeCompare(b.nombre)
      );
  
      setProductos(productosOrdenados);
  
      // Obtener datos de transacciones y ordenar por fecha de ingreso en orden descendente
      const responseTransacciones = await axios.get(
        "http://10.27.64.211:3001/api/transacciones"
      );
  
      const transaccionesOrdenadas = responseTransacciones.data.sort(
        (a, b) => new Date(b.fecha) - new Date(a.fecha)
      );
  
      // Limitar la cantidad de datos a mostrar (puedes ajustar el número según tu necesidad)
      const transaccionesJson = transaccionesOrdenadas.slice(0, 10);
  
      setData(transaccionesJson);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
     <div className="flex-1 p-6 container mx-auto">
      <div className="grid justify-items-center  items-center">
      <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
          <img src={packages} /> Consumibles
        </div>
        <div className="container mx-auto   columns-2 mt-4 flex flex-row justify-between">
          <div className="bg-[#c8d4fd] w-3/6 justify-center rounded-lg  p-4 mt-5  ">
            <form
              class="max-w-sm mx-10 flex flex-col"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seleccionar linea
                </label>
                <select
                  value={linea}
                  onChange={handleSelectChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" >Seleccione una linea de la lista</option>
                  {/* <option value="Linea 1">Linea 1 </option>
                  <option value="Linea 2">Linea 2</option>
                  <option value="Linea 3">Linea 3</option>
                  <option value="Linea 4">Linea 4</option>
                  <option value="Linea 5">Linea 5</option>
                  <option value="Linea 6">Linea 6</option>
                  <option value="Linea 7">Linea 7</option>
                  <option value="Linea 8">Linea 8</option>
                  <option value="Linea 9">Linea 9</option> */}
                  <option value="LINEA_10">Linea 10: PENANG+ </option>
                  <option value="LINEA_11">Linea 11: LONDON</option>
                  <option value="LINEA_12">Linea 12: CANYON</option>
                  <option value="LINEA_13">Linea 13: JUNO / VENUS</option>
                  <option value="AREA_CALIDAD">Area: CALIDAD</option>
                  <option value="AREA_SISTEMAS">Area: SISTEMAS</option>
                  <option value="AREA_MATERIALES">Area: MATERIALES</option>
                  <option value="AREA_ING_P5">Area: INGENIERIA P5</option>
                </select>
              </div>
              <div className="mt-3">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Seleccionar el producto
                </label>
                <select
                  value={producto}
                  onChange={handleProductoChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((producto) => (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className=" mt-8 flex justify-center p-10 bg-[#343285] text-white rounded-lg shadow-lg border-solid border-2 border-[#a7b6fa]">
                <button className="flex" id="restar" onClick={handleRestar}>
                  <img
                    src={restar}
                    className="p-4 hover:bg-[#3131315b]  rounded-xl cursor-pointer"
                    alt="restar"
                  />
                </button>
                <input
                  className="rounded-lg w-20 text-black text-center text-5xl"
                  value={cantidad}
                ></input>
                <button className="flex" id="sumar" onClick={handleSumar}>
                  <img
                    src={sumar}
                    className="p-4 hover:bg-[#3131315b] rounded-xl cursor-pointer"
                    alt="sumar"
                  />
                </button>
              </div>
              <div className="container mt-8  ">
                <button
                  type="button"
                  onClick={handleEntregar}
                  className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <span className="relative  w-full px-5 py-2.5 transition-all ease-in duration-75 bg-[#343285] text-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    ENTREGAR
                  </span>
                </button>
              </div>
            </form>
          </div>

          <div className=" p-4 w-full  ">
          <div className="mt- bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
              <img src={report} alt="reporte" />
              Ultimas entregas
            </div>

            <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg grid ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-400 dark:text-gray-400 ">
                <thead className="text-xs  uppercase bg-gray-500 text-white">
                  <tr className="">
                    <th scope="col" className="p-3 text-center">
                      fecha entrega
                    </th>
                    <th scope="col" className="p-3 text-center">
                      producto
                    </th>
                    <th scope="col" className="p-3 text-center">
                      cantidad entregada
                    </th>
                    <th scope="col" className="p-3 text-center">
                      linea
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((transaccion) => (
                    <tr
                      key={transaccion.id}
                      className="bg-white border-b hover:bg-indigo-100 cursor-pointer text-center"
                    >
                      <td className="p-3">
                        {moment(transaccion.fecha).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td className="p-3">
                        {transaccion.producto && transaccion.producto.nombre
                          ? transaccion.producto.nombre
                          : "N/A"}
                      </td>
                      <td className="p-3">{transaccion.cantidad}</td>
                      <td className="p-3">{transaccion.linea}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Consumibles;
