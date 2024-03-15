import { Card } from "flowbite-react";
import packoff from "../../assets/icons/packoff.svg";
import axios from 'axios';
import { useEffect, useState } from "react";

function CardStockInsuficiente() {


  const [productosConStockInsuficiente, setProductosConStockInsuficiente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/productos");

        // Filter products with stock greater than 10
        const productos = response.data.filter(producto => producto.stock < 10);

        setProductosConStockInsuficiente(productos);
      } catch (error) {
        console.error("Error al obtener los datos ", error);
      }
    };

    fetchData();
  }, []);
  
  
  
  
  
  return (
    <Card className="container">
      <div className="flex flex-col items-center ">
        <img
          alt="Bonnie image"
          height="36"
          src={packoff}
          width="36"
          className=" rounded-full shadow-lg"
        />
        <h5 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">
          STOCK INSUFICIENTE
        </h5>
        <span className="text-5xl text-red-400  font-semibold">{productosConStockInsuficiente.length}</span>
      </div>
    </Card>
  );
}

export default CardStockInsuficiente;