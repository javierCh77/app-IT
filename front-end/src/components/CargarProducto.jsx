import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

//icons
import boxadd from '../assets/icons/boxadd.svg'



const CargarProducto = ({ onFacturaCargada }) => {

  const [openModal, setOpenModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  const handleEnviarDatos = async () => {
    if (nombre === '' || monto === '') {
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
      const response = await axios.post('http://10.27.64.211:3001/api/productos', {
        nombre: nombre,
        stock: parseInt(monto),
      });

      toast.success('Factura cargada con éxito', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      // Llama a la función proporcionada por el componente principal para actualizar el estado
      onFacturaCargada();

      // Cierre del modal
      setOpenModal(false);

      // Resto de la lógica después de cargar la factura
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }

    // Limpiar los campos después de cargar la factura
   
    setNombre('');
    setMonto('');
  };

  return (
    <>
      <button
        type="submit"
        class="w-6/6 md:h-10 py-2 mt-2 md:w-1/6 rounded-md bg-indigo-600 p-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpenModal(true)}
      >
        CARGAR PRODUCTO
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-[#a7b6fa]">
          <div className='flex gap-3 align-middle justify-center'>
          <img src={boxadd} alt='icono producto'/> Nuevo producto
          </div>
          </Modal.Header>
        <Modal.Body>
          <div className="space-y-6  flex max-w-md flex-col gap-2 mx-auto ">
            <div>
              <div className="mb-2 block">
                <Label value="Nombre del producto" />
              </div>
              <TextInput type="text" placeholder='ingrese el nombre del producto' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-2 block">
              <Label value="Cantidad stock inicial" />
            </div>
            <TextInput type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="  bg-green-500" onClick={handleEnviarDatos}>
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

export default CargarProducto;