import React from 'react'
import From from '../component/From'
import Footer from '../component/Footer'

const Email = () => {
  return (
    <div className='dark:text-white'>
     <h1 className=' text-center font-spaceGrotesk font-bold  text-2xl text-black dark:text-white '>Type Your Sender Mail Here</h1>
      <hr className='h-2 bg-black'/>
      <div className=' w-[50%] mx-auto mt-2'>
        <From/>
      </div>
     <div className='mt-[233px] py-3'>
     <Footer/>
     </div>
     
    </div>
  )
}

export default Email
