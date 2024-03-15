import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale,LinearScale,PointElement,BarElement,Title,Tooltip,Legend,Filler,} from "chart.js";

const GraficaStock = () => {

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
        // max: Math.max(...productQuantities), // Ajustar según tus necesidades
      },
      x: {
        ticks: { color: '#443bc7' },
      },
    },
    borderColor: [
      '#3833a0'
    ],
    borderWidth: 1.5
  };

  const chartData = {
    labels: productNames,
    datasets: [
      {
        label: 'Cantidad entregada',
        data: productQuantities,
        backgroundColor: '#443BC74A',
      },
    ],
  };

  return (
    <>
          <Bar height="50vh"   data={chartData}  options={chartOptions} />
    </>
  );
};

export default GraficaStock;