import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from 'axios';

import packages from '../../assets/icons/packages.svg'




function TotalProductos() {

  const [totalProductos, setTotalProductos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/productos");
        const totalProductos = response.data.length; // Obtener el total de afiliados
        setTotalProductos(totalProductos);
      } catch (error) {
        console.error("Error al obtener los datos ", error);
      }
    };

    fetchData();
  }, []);




  return (
    <Card className="container ">
      <div className="flex flex-col items-center justify-center">
        <img
          alt="Bonnie image"
          height="36"
          src={packages}
          width="36"
          className="rounded-full shadow-lg"
        />
        <h5 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
          TOTAL PRODUCTOS
        </h5>
        <span className="text-5xl text-green-400 font-semibold">{totalProductos}</span>
      </div>

    </Card>
  );
}

export default TotalProductos;