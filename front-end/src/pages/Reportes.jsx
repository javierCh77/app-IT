import React from "react";
import Line from '../components/reports/Line'
import candle from "../assets/icons/candle.svg";



const Reportes = () => {
  return (
    <>
      <div className="flex-1 p-6 container mx-auto ">
        <div className="grid justify-items-center  items-center">
          <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
            <img src={candle} /> Reportes NTF
          </div>
        </div>
        
        <div>
            <Line/>
        </div>
        
        <div class=" w-full bg-white rounded-lg shadow dark:bg-gray-800 mt-4 ">
          <div class=" overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm   text-gray-500 dark:text-gray-400">
              <thead class=" text-md text-white uppercase bg-[#1a57db6d] dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th scope="" class="p-2 w-3/12">
                    Defecto
                  </th>
                  <th scope="" class="p-2  w-3/12">
                    Estacion
                  </th>
                  <th scope="" class="p-2  w-3/12">
                    Cantidad
                  </th>
                  <th scope="" class="p-2  w-3/12">
                    %
                  </th>
                </tr>
              </thead>
              <tbody className="">
                <tr class="w-full  bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1   w-3/12 ">ANDROID_TELL_FINGERPRINT_FLESH_FLAT_TEST	</th>
                  <th class="p-1  w-3/12">FOD TEST</th>
                  <th class="p-1 text-red-400  w-3/12">5</th>
                  <th class="p-1 text-red-400  w-3/12">10% </th>
                </tr>
                <tr class="w-full  bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1   w-3/12 ">ANDROID_TELL_FINGERPRINT_FLESH_FLAT_TEST	</th>
                  <th class="p-1  w-3/12">L2AR</th>
                  <th class="p-1 text-red-400  w-3/12">2</th>
                  <th class="p-1 text-red-400  w-3/12">3% </th>
                </tr>
                <tr class="w-full  bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th class="p-1   w-3/12 ">ANDROID_TELL_FINGERPRINT_FLESH_FLAT_TEST	</th>
                  <th class="p-1  w-3/12">RADIO SLIM</th>
                  <th class="p-1 text-red-400  w-3/12">10</th>
                  <th class="p-1 text-red-400  w-3/12">18% </th>
                </tr>
                
               
              </tbody>
            </table>
            </div>
            </div>
      </div>
    </>
  );
};

export default Reportes;
