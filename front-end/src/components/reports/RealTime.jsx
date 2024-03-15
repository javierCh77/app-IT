import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

const RealTime = () => {
  useEffect(() => {
    const options = {
      series: [50, 50],
      chart: {
        type: 'donut',
        height: 80, // Ajusta la altura según sea necesario
      },
      plotOptions: {
        pie: {
          startAngle: -360,
          endAngle: 0,
          offsetX: 0,
          offsetY: 0,
          hollow: {
            size: '70%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false,
            },
          },
          expandOnClick: false,
        }
      },
      labels: [''],
      title: {
        text: '92%',
        align: 'center',
        margin: 0,
        offsetX: 3, // Centra horizontalmente
        offsetY: 38, // Centra verticalmente
        style: {
          fontSize: '11px',
          color: '#263238'
        }
      },
      legend: {
        show: false
      }
    };

    const chart = new ApexCharts(document.getElementById("donut-chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
  <>  
  
      <div id="donut-chart"></div>
  
    
  </>
    
  );
}

export default RealTime;