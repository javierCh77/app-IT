import dashboard from "../assets/icons/dashboard.svg";
import GraficaAfiliados from "../components/charts/GraficaStock";
import CardTotalProductos from "../components/tags/CardTotalProductos";

import CardStockSuficiente from "../components/tags/CardStockSuficiente";
import CardStockInsuficiente from "../components/tags/CardStockInsuficiente";





const DashboardStock = () => {


 


  return (
    <>
    <div className="flex-1 p-6 container mx-auto">
      <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={dashboard} alt="ticket" /> Dashboard stock
      </div>

      {/* aqui arranca la app */}
      <div className="mt-4 container">
      
      <div className=" w-full  h-54 rounded-lg shadow-md bg-[#e1e7fe] flex flex-row justify-center text-center p-5 gap-5 ">
          <div className=" container "> 
            <CardTotalProductos/>
          </div>
          <div className=" container ">
            <CardStockSuficiente/>
          </div>
          <div className=" container ">
            <CardStockInsuficiente/>
          </div>
      </div>
      
      <div className="mt-4 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={dashboard} alt="ticket" /> Consumo mensual
      </div>
      <div className="container flex justify-center mt-2">
        <p className=" text-base">Top productos consumidos mensualmente </p>
      </div>
        <div className="container w-full sm:w-full   mt-2 rounded-lg ">
  
             <GraficaAfiliados /> 
       
        </div>
      </div>
      </div>
     
    </>
  );
};

export default DashboardStock;