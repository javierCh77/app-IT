import React from 'react'
import checkdark from '../assets/icons/checkdark.svg'



const Auditoria = () => {
  return (
    <>
      <div className="flex-1 p-6 container mx-auto">
    <div className="grid justify-items-center  items-center">
    <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
          <img src={checkdark} /> Auditorias
        </div>
    </div>
 
    </div>
    </>
  )
}

export default Auditoria
