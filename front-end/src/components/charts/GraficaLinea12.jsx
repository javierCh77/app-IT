import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import moment from 'moment';





const GraficaLinea12 = () => {
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

  
  // Filtrar los datos por la línea 13
  const linea13Data = data.filter((item) => item.linea === 'LINEA_12');



  // Filtrar los datos por la línea 13 y los últimos 7 días
  const last7DaysDataLinea13 = data.filter((item) => {
    const today = new Date();
    const itemDate = new Date(item.fecha);
    // Verificar que el producto pertenezca a la línea 13
    const isLinea13 = item.linea === 'LINEA_12';
    console.log("este",isLinea13);
    // Comparar si la fecha del item está dentro de los últimos 7 días y pertenece a la línea 13
    const daysDifference = (today - itemDate) / (1000 * 60 * 60 * 24);
    
    
    return isLinea13 && daysDifference <= 7;
  });

  // Agrupar y sumar las cantidades de productos
  const aggregatedData = last7DaysDataLinea13.reduce((acc, item) => {
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

  ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler);

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
        beginAtZero: true,
        // min: 0,
        // max: Math.max(...productQuantities),
      },
      x: {
        ticks: { color: '#443bc7' },
      },
    },
    borderColor: [
      'rgba(255, 99, 132, 0.7)',
      'rgba(255, 159, 64, 0.7)',
      'rgba(255, 205, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)',
     'rgba(54, 162, 235, 0.7)',
      'rgba(153, 102, 255, 0.7)',
     'rgba(201, 203, 207, 0.7)'
    ],
    borderWidth: 1.5
  
  };

  const predefinedColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

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
      <Bar height={56} data={chartData}  options={chartOptions} />
    </>
  );
};

export default GraficaLinea12;