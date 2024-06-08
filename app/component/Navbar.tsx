import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import DarkMode from './DarKMode'


const Navbar = () => {
  return (
    <header className='w-full'>
    <nav  className='nav'>
        <Link href='/' className='flex items-center gap-1"'>
          <Image src='/Image/icon/icons8-email-64.svg' alt='logo'  width={27} height={27}/>
          <p className="nav-logo">Quik <span className='text-primary'>Send</span></p>
        </Link>

        <div  className='flex items-center gap-5'>
     <DarkMode/>
        </div>
    </nav>
     
   </header>
  )
}

export default Navbar
