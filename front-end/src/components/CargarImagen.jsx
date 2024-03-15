import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, Label, Modal, TextInput } from 'flowbite-react';

//icons
import boxadd from '../assets/icons/boxadd.svg'
import upload from '../assets/icons/upload.svg'
import download from '../assets/icons/download.svg';

const CargarImagen = ({ onFacturaCargada }) => {

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
        class=" flex  items-center  gap-2 justify-center w-6/6 md:h-10 py-2 mt-2 md:w-1/6 rounded-md bg-indigo-600 p-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpenModal(true)}
      ><img src={upload} alt='upload'/>
        SUBIR IMAGEN
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header className="bg-[#a7b6fa]">
          <div className='flex gap-3 align-middle justify-center'>
          <img src={download} alt='icono producto'/> Nueva Imagen
          </div>
          </Modal.Header>
        <Modal.Body>
          <div className="space-y-6  flex max-w-md flex-col gap-2 mx-auto ">
            <div>
              <div className="mb-2 block">
                <Label value="Nombre de la imagen" />
              </div>
              <TextInput type="text" placeholder='ingrese el nombre de la imagen' value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                  Selecciona una categoria
                </label>
                <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option value="" >Selecciona una de las categorias</option>
                  <option value="IFLASH">Estacion: IFLASH </option>
                  <option value="JOT">Estacion: JOT</option>
                  <option value="L2AR">Estacion: L2AR</option>
                  <option value="FOOD">Estacion: FOOD</option>
                  <option value="L2VISION">Estacion: L2VISION</option>
                  <option value="DEPTHVAL">Estacion: DEPTH VAL</option>
                  <option value="DEPTHCAL">Estacion: DEPTH CAL</option>
                  <option value="CFC">Estacion: CFC</option>
                  <option value="SSD">Estacion: CCD</option>
                  <option value="SSDLCD">Estacion: CCD-LCD</option>
                  <option value="SSDLENT">Estacion: CCD-LENT</option>
                  <option value="XCVR">Estacion: XCVR</option>
                  <option value="AUTOLINER">Estacion: AUTOLINER</option>
                </select>
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                  Selecciona una linea
                </label>
                <select  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  <option value="" >Selecciona una de las categorias</option>
                  <option value="LINEA 1">LINEA 1</option>
                  <option value="LINEA 2">LINEA 2</option>
                  <option value="LINEA 3">LINEA 3</option>
                  <option value="LINEA 4">LINEA 4</option>
                  <option value="LINEA 5">LINEA 5</option>
                  <option value="LINEA 6">LINEA 6</option>
               
                </select>
              </div>
            <div className="mb-2 block">
                <label class="mb-2 text-sm font-medium  text-gray-900 dark:text-white" for="user_avatar">Seleccione el archivo a subir</label>
                <input class="mt-2 w-full text-sm  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" type="file"/>
              
              </div>
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

export default CargarImagen;