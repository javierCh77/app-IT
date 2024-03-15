import dashboard from "../assets/icons/dashboard.svg";
import GraficaLinea10 from '../components/charts/GraficaLinea10';
import GraficaLinea11 from "../components/charts/GraficaLinea11";
import GraficaLinea12 from "../components/charts/GraficaLinea12";
import GraficaLinea13 from "../components/charts/GraficaLinea13";
/////////////////////////////////////////////////////////////////////
import GraficaCalidad from "../components/charts/GraficaCalidad";
import GraficaSistemas from '../components/charts/GraficaSistemas';
import GraficaMateriales from "../components/charts/GraficaMateriales";
import GraficaIp5 from '../components/charts/GraficaIp5';



const Estadisticas = () => {


  return (
    <>
    <div className="flex-1 p-6 container mx-auto">
    <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={dashboard} alt="ticket" /> Estadisticas
      </div>
      {/* /////////////////////////////////////////////////////////////////////// */}
      <div className="flex justify-between px-2">
        <p className="text-base">Linea 10: Penang +</p>
        <p className="text-base">Area: Calidad</p>
        <p className="text-base px-8">Metrica</p>
        </div>
      {/* aqui arranca la app */}
      <div className="columns-4  justify-center items-center flex  text-center gap-2 p-2 ">
        <div className="w-full     p-2 rounded-lg   ">
            <GraficaLinea10   />
        </div> 
        <div className="w-full     p-2 rounded-lg   ">
            <GraficaCalidad   />
        </div> 
        <div className="w-30   p-4 rounded-lg bg-[#443bc7]  ">
            <p className="text-lg text-[#c8d4fd]">CONSUMO</p>
            <p className="text-white">10%</p>
        </div> 
      </div>
      
      {/* ////////////////////////////////////////////////////////////////////////////////////// */}
      <div className="flex justify-between px-2">
        <p className="text-base">Linea 11: London</p>
        <p className="text-base">Area: Sistemas</p>
        <p className="text-base px-8">Metrica</p>
        </div>
      <div className="columns-4  justify-center items-center flex  text-center gap-2 p-2 ">
        <div className="w-full     p-2 rounded-lg   ">
            <GraficaLinea11   />
        </div> 
        <div className="w-full    p-2 rounded-lg   ">
            <GraficaSistemas   />
        </div> 
        <div className="w-30 columns-1  p-4 rounded-lg bg-[#443bc7]  ">
        <p className="text-lg text-[#c8d4fd]">CONSUMO</p>
            <p className="text-white">10%</p>
        </div> 
      </div>
      <div className="flex justify-between px-2">
        <p className="text-base">Linea 12: Juno/Venus</p>
        <p className="text-base">Area: Materiales</p>
        <p className="text-base px-8">Metrica</p>
        </div>
      <div className="columns-4 justify-center flex items-center text-center gap-2 p-2 ">
        <div className="w-full    p-2 rounded-lg   ">
            <GraficaLinea12   />
        </div> 
        <div className="w-full    p-2 rounded-lg   ">
            <GraficaMateriales   />
        </div> 
        <div className="w-30 columns-1  p-4 rounded-lg bg-[#443bc7]  ">
        <p className="text-lg text-[#c8d4fd]">CONSUMO</p>
            <p className="text-white">10%</p>
        </div> 
      </div>
      <div className="flex justify-between px-2">
        <p className="text-base">Linea 12: Canyon</p>
        <p className="text-base">Area: Ing P5</p>
        <p className="text-base px-8">Metrica</p>
        </div>
      <div className="columns-4 justify-center flex items-center text-center gap-2 p-2 ">
        <div className="w-full    p-2 rounded-lg   ">
            <GraficaLinea13   />
        </div> 
        <div className="w-full    p-2 rounded-lg   ">
            <GraficaIp5   />
        </div> 
        <div className="w-30 columns-1  p-4 rounded-lg bg-[#443bc7]  ">
        <p className="text-lg text-[#c8d4fd]">CONSUMO</p>
            <p className="text-white">10%</p>
        </div> 
      </div>
      </div>
    
    </>
  );
};

export default Estadisticas;