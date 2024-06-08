import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Cards from './component/Cards';

export default function Home() {
  return (
<>
    <section className='px-6 py-5  md:px-20  '>
      <div className=' '>
      <Image src='/Image/pics/banner.jpg' alt='banner' width={1280} height={20}   className=''/>
      <div className=' bg-lime-500 flex '>
       <p className='banner-text '>Welcome to <br/> Quik <span className=' text-primary'>Send</span> </p>
       <button className='btn -mt-[90px]'><Link href='/email'>Send Email Now</Link></button>
      </div>
      </div>
      <div>
        <h2 className='section-text'>Fully responsive email sending website</h2>
        <p className=' section-p'>A fully responsive email sending website adapts its interface and features to various devices, ensuring a seamless user experience. It utilizes flexible layouts, media queries, and optimized images to maintain consistent functionality and aesthetics, enhancing user engagement and email campaign effectiveness.</p>
      </div>
     
    </section>
    <div>
      <Cards
      src='/Image/icon/email01.gif'
      title='Clean email template'
      dis='This clean email template is designed for concise communication. The subject line provides a clear purpose, the greeting is polite and professional, and the main content delivers the essential update succinctly. The closing maintains a friendly tone while being brief.'
      />
      <Cards
      src='/Image/icon/mark.gif'
      title='Highest compatibility'
      dis='This clean email template ensures broad compatibility. Its straightforward structure works well across various devices and email clients. The concise content guarantees readability and quick comprehension.'
      />
      <Cards
      src='/Image/icon/light.gif'
      title='Responsive design'
      dis='This clean email template features responsive design. Its layout adapts seamlessly to different devices and screen sizes. The concise content ensures easy readability on any platform.'
      />
     </div>
    </>
  );
}
