import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import RealTime from "./RealTime";




const Line = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const options = {
      // enable and customize data labels using the following example, learn more from here: https://apexcharts.com/docs/datalabels/
      dataLabels: {
        enabled: true,
        // offsetX: 10,
        style: {
          cssClass: "text-xs text-white font-medium",
        },
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 16,
          right: 16,
          top: -26,
        },
      },
      series: [
        {
          name: "14/03/2024",
          data: [97.27, 96.09, 97.18, 95.71, 95.40, 95.04, 94.80, 96.88, 96.10],
          color: "#1a57db28",
        },
        {
          name: "15/03/2024",
          data: [95.63, 93.10, 96.02],
          color: "#7E3BF2",
        },
      ],
      chart: {
        height: "100%",
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      legend: {
        show: true,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#1C64F2",
          gradientToColors: ["#1C64F2"],
        },
      },
      stroke: {
        width: 5,
      },
      xaxis: {
        categories: [
          "07:00",
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
        ],
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
        labels: {
          formatter: function (value) {
            return value + "%";
          },
        },
      },
    };

    if (chartRef.current && typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy(); // Limpia el gráfico al desmontar el componente
      };
    }
  }, []); // El seg // El segundo argumento del useEffect, una matriz vacía, asegura que el efecto solo se ejecute una vez después del montaje del componente.

  return (
    <>
      {/* Contenedor del gráfico */}
      <div className="gap-2  justify-between flex">
        <div class="max-w-2xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
          <div class="flex justify-between mb-5">
            <div>
              <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                Linea Venus
              </h5>
              <p class="text-base font-normal text-gray-500 dark:text-gray-400">
                Comparacion FTY{" "}
              </p>
            </div>
            <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
              {" "} P.Yield
              94.83%
              <svg
                class="w-3 h-3 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
            </div>
          </div>
          <div ref={chartRef} id="data-labels-chart" />
        </div>
        
        
        <div class="max-w-2xl w-full bg-white rounded-lg shadow dark:bg-gray-800 mt-4 ">
          <div class=" overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm   text-gray-500 dark:text-gray-400">
              <thead class=" text-md text-white uppercase bg-[#a688fd] dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="" class=" p-1 w-2/12 ">
                    Estacion
                  </th>
                  <th scope="" class="p-1  w-2/12">
                    P.YIELD%
                  </th>
                  <th scope="" class="p-1 w-2/12">
                    T.NTF COUNT
                  </th>
                  <th scope="" class="p-1  w-2/12">
                    P.NTF
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr class="w-full  bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-3/12 ">CFC</th>
                  <th class="p-1   w-3/12">94% </th>
                  <th class="p-1    text-green-400  w-3/12">2 </th>
                  <th class="p-1 text-green-400  w-3/12">2.53% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-3/12 ">DEPTH-CAL</th>
                  <th class="p-1   w-3/12">100% </th>
                  <th class="p-1 text-green-400  w-3/12">0 </th>
                  <th class="p-1 text-green-400 w-3/12">0% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-5/12 ">DEPTH-VAL</th>
                  <th class="p-1   w-4/12">79.55% </th>
                  <th class="p-1 text-green-400  w-4/12">0 </th>
                  <th class="p-1 text-green-400 w-4/12">0% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff] w-5/12 ">L2AR</th>
                  <th class="p-1   w-4/12">92.00% </th>
                  <th class="p-1 text-green-400  w-4/12">3 </th>
                  <th class="p-1 text-red-400 w-4/12">10.71% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-5/12 ">LCD-CAL</th>
                  <th class="p-1   w-4/12">100% </th>
                  <th class="p-1 text-green-400  w-4/12">0 </th>
                  <th class="p-1 text-green-400 w-4/12">0% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-5/12 ">RADIO SLIM</th>
                  <th class="p-1   w-4/12">96.00% </th>
                  <th class="p-1 text-green-400  w-4/12">1 </th>
                  <th class="p-1  text-amber-400 w-4/12">7% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-5/12 ">SQT</th>
                  <th class="p-1   w-4/12">96% </th>
                  <th class="p-1 text-green-400  w-4/12">0 </th>
                  <th class="p-1 text-green-400 w-4/12">0% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ede8ff]  w-5/12 ">UCT</th>
                  <th class="p-1   w-4/12">93.18% </th>
                  <th class="p-1 text-green-400  w-4/12">6 </th>
                  <th class="p-1 text-red-400 w-4/12">17.65% </th>
                </tr>
                <tr class="w-full  bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1 bg-[#ffde84]  w-5/12 ">TOTAL</th>
                  <th class="p-1 bg-[#ffde84]  w-4/12">94.60% </th>
                  <th class="p-1 bg-[#ffde84]   w-4/12">32 </th>
                  <th class="p-1 bg-[#ffde84] w-4/12">2.64% </th>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Line;
