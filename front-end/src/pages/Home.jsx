import React from 'react'
import news2 from '../assets/icons/news2.svg'




const Home = () => {
  return (
    <div className="flex-1 p-6 container mx-auto">
      <div className="mb-2 bg-[#c8d4fd] w-full flex gap-2 text-xl font-semibold text-[#1e1c4a]">
        <img src={news2} /> Noticias
      </div>
      
      <div>
          <li>Modulo stock finalizado ✔️</li>
          <li>Modulo login finalizado ✔️</li>
          <li>Para altas de usuarios mail a javier.chavarria@newsan.com.ar, con los siguientes datos:⚠️</li>
              <p className='px-6 font-semibold'>E-mail : ejemplo@newsan.com.ar, Nombre completo: fabian andres sotomayor</p>
          <li>Modulo de Auditoria = Proceso 🏃</li>
          <li>Modulo de Imagenes = Proceso 🏃</li>
      </div>
    </div>
  )
}

export default Home
