import React from 'react'
import Image from 'next/image'
interface Props{
    
    src:string;
    title:string;
    dis:string;
   
  }
  
const Cards = ({src,title,dis}:Props) => {
  return (
    <div className='card dark:text-white  w-[80%] mx-auto mt-5'>
    <div className='flex items-center gap-2'>
        <Image src={src} alt={title} width={30} height={30}/>
        <h2 className=' text-xl font-bold'>{title}</h2>
    </div>
    
    <p className=' mt-3 px-3 font-semibold'>{dis}</p>
</div>
  )
}

export default Cards
