import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from 'axios';
import boxadd from '../../assets/icons/boxadd.svg'



function CardStockSuficiente() {

  const [productosConStockSuficiente, setProductosConStockSuficiente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/productos");

        // Filter products with stock greater than 10
        const productos = response.data.filter(producto => producto.stock >= 10);

        setProductosConStockSuficiente(productos);
      } catch (error) {
        console.error("Error al obtener los datos ", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <Card className="container">
      <div className="flex flex-col items-center">
        <img
          alt="Bonnie image"
          height="36"
          src={boxadd}
          width="36"
          className="rounded-full shadow-lg"
        />
        <h5 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
          STOCK SUFICIENTE
        </h5>
        <span className="text-5xl  text-amber-300 font-semibold">{productosConStockSuficiente.length}</span>

      </div>
    </Card>
  );
}

export default CardStockSuficiente;