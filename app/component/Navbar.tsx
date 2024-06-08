import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DarkMode from './DarKMode'


const Navbar = () => {
  return (
    <header className='w-full'>
    <nav  className='nav'>
        <Link href='/' className='flex items-center gap-1"'>
          <Image src='/Image/icon/icons8-email-64.svg' alt='logo'  width={40} height={40}/>
          <p className="nav-logo">Quik <span className='text-primary'>Send</span></p>
        </Link>

        <div  className='flex items-center gap-5'>
        <Link href='/email'><Image src='/Image/icon/send.png' alt='send' height={90} width={40}/></Link>
     <DarkMode/>
    
        </div>
    </nav>
     
   </header>
  )
}

export default Navbar
