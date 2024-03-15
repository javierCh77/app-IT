import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';
import  axios  from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const GraficaLinea = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.27.64.211:3001/api/transacciones");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filtrar los datos por los últimos 7 días
  const last7DaysData = data.filter((item) => {
    const today = new Date();
    const itemDate = new Date(item.fecha);

    // Comparar si la fecha del item está dentro de los últimos 7 días
    const daysDifference = (today - itemDate) / (1000 * 60 * 60 * 24);
    return daysDifference <= 7;
  });

  // Agrupar y sumar las cantidades de productos
  const aggregatedData = last7DaysData.reduce((acc, item) => {
    const existingItem = acc.find(
      (group) => group.producto.toLowerCase() === item.producto.nombre.toLowerCase()
    );
  
    if (existingItem) {
      existingItem.cantidad += item.cantidad;
    } else {
      acc.push({
        producto: item.producto.nombre,
        cantidad: item.cantidad,
      });
    }
  
    return acc;
  }, []);

  // Ordenar los datos por cantidad de mayor a menor
  const sortedData = aggregatedData.sort((a, b) => b.cantidad - a.cantidad);

  // Obtener los nombres de productos y las cantidades desde los datos ordenados
  const productNames = sortedData.map((group) => group.producto);
  const productQuantities = sortedData.map((group) => group.cantidad);

  ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

  const chartOptions = {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: Math.max(...productQuantities), // Ajustar según tus necesidades
      },
      x: {
        ticks: { color: '#443bc7' },
      
      },
    },
  };






  const predefinedColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'

  ]

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Cantidad entregada',
        data: productQuantities,
        backgroundColor: predefinedColors,
      },
    ],
  };






  return (
    <>
          {/* <Bar height={27} data={chartData}  options={chartOptions} /> */}
           <Line  height={27} data={chartData} options={chartOptions}/>
    </>
  );
};

export default GraficaLinea;