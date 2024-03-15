import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import plus from "../assets/icons/plus.svg";

const CargarStock = ({ onStockCargado, onEstadoActualizado, producto }) => {

  const [openModal, setOpenModal] = useState(false);
  const nfactura = producto.id
  const [stock, setStock] = useState(0);
  const [productos, setProductos] = useState([]);

  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Obtener la lista de productos para el select
    const obtenerProductos = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/productos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
   
    obtenerProductos();
  }, []);
  ////////////////////////////////////////////////////////////////////////////////////

  const handleEnviarDatos = async () => {
    if (nfactura === "" || stock === "") {
      toast.warning("Falta completar alguno de los campos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    
    try {
      const response = await axios.post(
        `http://10.27.64.211:3001/api/productos/${nfactura}/sumar-stock`,
        {
          stock: parseInt(stock),
        }
      );
      toast.success("Stock modificado con éxito", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      onStockCargado();
      onEstadoActualizado(true);
      setStock("")
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
    // Limpiar los campos después de cargar la factura y cerrar el modal al enviar el dato
    setStock("");
    setOpenModal(false);
  };
  
  

  return (
    <>
      <button type="submit" onClick={() => setOpenModal(true)}>
        <img
          alt="edit"
          className="rounded shadow-md hover:bg-[#c8d4fd] text-center justify-center"
          src={plus}
        />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-[#a7b6fa]">🧾 Cargar Stock</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex max-w-md flex-col gap-2 mx-auto">
            <div>
              <div className="mb-2 block">
                <Label value="Producto" />
              </div>
              <h1 className="text-4xl bg-[#c8d4fd] text-[#343285] rounded-lg p-2 text-center">{producto && producto.nombre}</h1>
            </div>

            <div className="mb-2 block">
              <Label value="Cantidad" />
            </div>
            <TextInput
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-green-500" onClick={handleEnviarDatos}>
            CARGAR
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            SALIR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CargarStock;
